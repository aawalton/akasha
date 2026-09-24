import { Capacitor } from "@capacitor/core"
import {
  ingestResponseSchema,
  type LocationPoint,
  MAX_BATCH_POINTS,
} from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"
import {
  addPoint,
  mapPluginLocation,
  nextBatch,
  nextSeq,
  type PluginLocation,
  readStoredBuffer,
  removePoints,
  seqPastBuffer,
} from "akasha/alan/atlas-web/modules/location-capture/location-capture.module.code.ts"

const DEVICE_ID_KEY = "atlas.capture.deviceId"
const SEQ_KEY = "atlas.capture.clientSeq"
const BUFFER_KEY = "atlas.capture.buffer"
const REFUSED_BUFFER_KEY_PREFIX = "atlas.capture.buffer.refused."

const DISTANCE_FILTER_M = 10

interface CaptureState {
  deviceId: string
  seq: number
  buffer: readonly LocationPoint[]
}
let state: CaptureState | null = null
let started = false

let flushing = false
let flushPending = false

let lock: Promise<void> = Promise.resolve()
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = lock.then(fn)
  lock = run.then(
    () => undefined,
    () => undefined
  )
  return run
}

type PreferencesApi = typeof import("@capacitor/preferences")["Preferences"]
let prefsApi: PreferencesApi | null = null
async function prefs(): Promise<PreferencesApi> {
  if (prefsApi === null) {
    const mod = await import("@capacitor/preferences")
    prefsApi = mod.Preferences
  }
  return prefsApi
}

async function persistSeq(p: PreferencesApi, seq: number): Promise<void> {
  await p.set({ key: SEQ_KEY, value: String(seq) })
}
async function persistBuffer(p: PreferencesApi, buffer: readonly LocationPoint[]): Promise<void> {
  await p.set({ key: BUFFER_KEY, value: JSON.stringify(buffer) })
}

async function loadState(): Promise<CaptureState> {
  const p = await prefs()
  const [device, seqRow, bufferRow] = await Promise.all([
    p.get({ key: DEVICE_ID_KEY }),
    p.get({ key: SEQ_KEY }),
    p.get({ key: BUFFER_KEY }),
  ])

  let deviceId = device.value ?? ""
  if (deviceId.length === 0) {
    deviceId = crypto.randomUUID()
    await p.set({ key: DEVICE_ID_KEY, value: deviceId })
  }

  const parsedSeq = seqRow.value === null ? 0 : Number.parseInt(seqRow.value, 10)
  const seq = Number.isFinite(parsedSeq) && parsedSeq >= 0 ? parsedSeq : 0

  let buffer: readonly LocationPoint[] = []
  if (bufferRow.value !== null) {
    const read = readStoredBuffer(bufferRow.value)
    buffer = read.points
    if (read.unreadable || read.refused > 0) {
      const keptAt = `${REFUSED_BUFFER_KEY_PREFIX}${String(Date.now())}`
      await p.set({ key: keptAt, value: bufferRow.value })
      console.warn(
        `[atlas/web/location-capture] saved buffer ${read.unreadable ? "unreadable" : `refused ${String(read.refused)} point(s)`}, kept ${String(buffer.length)}, copied whole to ${keptAt}: ${read.why ?? ""}`
      )
    }
  }

  return { deviceId, seq: seqPastBuffer(seq, buffer), buffer }
}

async function handleLocation(loc: PluginLocation): Promise<void> {
  await withLock(async () => {
    if (state === null) return
    const point = mapPluginLocation(loc, {
      deviceId: state.deviceId,
      clientSeq: state.seq,
      nowMs: Date.now(),
    })
    if (point === null) {
      console.warn(
        `[atlas/web/location-capture] refused a location with no place on Earth: ${JSON.stringify(loc)}`
      )
      return
    }
    const p = await prefs()
    state = { ...state, buffer: addPoint(state.buffer, point), seq: nextSeq(state.seq) }
    await persistBuffer(p, state.buffer)
    await persistSeq(p, state.seq)
  })
  void flush()
}

function peekBatch(): Promise<readonly LocationPoint[]> {
  return withLock(async () => (state === null ? [] : nextBatch(state.buffer, MAX_BATCH_POINTS)))
}

async function ackRemove(batch: readonly LocationPoint[]): Promise<void> {
  await withLock(async () => {
    if (state === null) return
    const p = await prefs()
    state = { ...state, buffer: removePoints(state.buffer, batch) }
    await persistBuffer(p, state.buffer)
  })
}

async function uploadBatch(batch: readonly LocationPoint[]): Promise<boolean> {
  try {
    const res = await fetch("/api/locations/ingest", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ points: batch }),
    })
    if (!res.ok) return false
    const answer = ingestResponseSchema.safeParse(await res.json())
    if (!answer.success) return false
    for (const one of answer.data.refused ?? []) {
      console.warn(
        `[atlas/web/location-capture] ingest refused point ${String(one.index)}: ${one.why} — ${JSON.stringify(batch[one.index])}`
      )
    }
    return true
  } catch {
    return false
  }
}

async function flush(): Promise<void> {
  if (flushing) {
    flushPending = true
    return
  }
  flushing = true
  try {
    let batch = await peekBatch()
    while (batch.length > 0) {
      const ok = await uploadBatch(batch)
      if (!ok) break
      await ackRemove(batch)
      batch = await peekBatch()
    }
  } finally {
    flushing = false
    if (flushPending) {
      flushPending = false
      void flush()
    }
  }
}

export async function startLocationCapture(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  if (started) return
  started = true
  try {
    state = await loadState()
    const geolocation = (await import("@capgo/background-geolocation")).BackgroundGeolocation

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") void flush()
      })
    }

    void flush()

    await geolocation.start(
      {
        backgroundTitle: "Atlas is recording your route",
        backgroundMessage: "Location is used to build your travel map. Tap to open Atlas.",
        requestPermissions: true,
        stale: false,
        distanceFilter: DISTANCE_FILTER_M,
      },
      (location, error) => {
        if (error) {
          if (error.code === "NOT_AUTHORIZED") void geolocation.openSettings()
          return
        }
        if (location) void handleLocation(location)
      }
    )
  } catch (err) {
    started = false
    console.error("[atlas/web/location-capture] start failed:", err)
  }
}
