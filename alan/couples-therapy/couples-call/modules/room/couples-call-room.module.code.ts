import {
  base64Of,
  bytesOf,
} from "akasha/agent/seat/voice/modules/setup/seat-voice-setup.module.code.ts"
import {
  dequeued,
  doubled,
  emptied,
  FRAME_MS,
  FRAME_SAMPLES,
  LEG_RATE,
  mixed,
  muLawOfSamples,
  queued,
  queueHolding,
  type SampleQueue,
  samplesOfBytes,
  samplesOfMuLaw,
  speaking,
  thirded,
} from "akasha/alan/couples-therapy/couples-call/modules/audio/couples-call-audio.module.code.ts"
import {
  setupFor,
  therapistPages,
} from "akasha/alan/couples-therapy/couples-call/modules/brief/couples-call-brief.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { randomId } from "akasha/page/id/modules/random-id/random-id.module.code.ts"
import {
  askingFor,
  objectIn,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

export type Spouse = "alan" | "jenny"

const SPOUSES: readonly Spouse[] = ["alan", "jenny"]

const NAMED: Readonly<Record<Spouse, string>> = { alan: "Alan", jenny: "Jenny" }

const LIVE_AT =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent"

const KEY = "GEMINI_API_KEY"

const EXPECTED_WITHIN_MS = 60_000

const LEG_HOLDS = FRAME_SAMPLES * 10

const SAID_HOLDS = LEG_RATE * 120

const HEARD_EVERY_FRAMES = 5

const SPEAKING_FRAMES = 8

const RECONNECTS = 3

const TICK_MS = 10

const BEHIND_FRAMES = 25

export type LegSocket = { readonly send: (text: string) => unknown; readonly close: () => unknown }

type Refused = { readonly refused: string }

type Said = Readonly<Record<string, unknown>>

type Leg = {
  readonly spouse: Spouse
  readonly socket: LegSocket
  readonly heard: SampleQueue
  loud: number
}

type Live = {
  ws: WebSocket | null
  ready: boolean
  readonly pending: Said[]
  handle: string | null
  reconnects: number
  readonly setup: Said
}

type Room = {
  readonly legs: Map<Spouse, Leg>
  readonly live: Live
  readonly said: SampleQueue
  readonly startedAt: number
  ticker: ReturnType<typeof setInterval> | null
  framesDone: number
  heardBatch: Int16Array[]
  marked: Spouse | null
  ending: boolean
}

type Expected = Map<
  string,
  { readonly spouse: Spouse; readonly until: number; readonly leg: string }
>

export const STREAM_LEG = "leg"

const EXPECTED_AT = Symbol.for("akasha.couples-call.expected")

const SHARED = globalThis as { [EXPECTED_AT]?: Expected }

SHARED[EXPECTED_AT] ??= new Map()

const EXPECTED: Expected = SHARED[EXPECTED_AT]

const BY_SOCKET = new Map<LegSocket, Leg>()

const HELD: { room: Room | null; opening: Promise<Room | null> | null } = {
  room: null,
  opening: null,
}

function otherOf(spouse: Spouse): Spouse {
  return spouse === "alan" ? "jenny" : "alan"
}

export async function spouseCalling(from: string): Promise<Spouse | null | Refused> {
  const persons = await askingFor({ pageTypeSlug: "person", keys: ["slug", "phone"] })
  if ("refused" in persons) return persons
  const row = persons.rows.find((one) => textIn(one.phone) === from)
  const slug = textIn(row?.slug)
  return slug === "alan" || slug === "jenny" ? slug : null
}

export function expectCall(callControlId: string, spouse: Spouse, now = Date.now()): string {
  for (const [id, one] of EXPECTED) if (one.until < now) EXPECTED.delete(id)
  const leg = randomId()
  EXPECTED.set(callControlId, { spouse, until: now + EXPECTED_WITHIN_MS, leg })
  return leg
}

export function streamAdmitted(request: Request, now = Date.now()): boolean {
  const leg = new URL(request.url).searchParams.get(STREAM_LEG)
  if (leg === null) return false
  for (const one of EXPECTED.values()) if (one.leg === leg && one.until >= now) return true
  return false
}

export function spouseExpected(callControlId: string, now = Date.now()): Spouse | null {
  const one = EXPECTED.get(callControlId)
  EXPECTED.delete(callControlId)
  return one === undefined || one.until < now ? null : one.spouse
}

function sentLive(room: Room, said: Said): undefined {
  const { live } = room
  if (live.ready && live.ws?.readyState === WebSocket.OPEN) live.ws.send(JSON.stringify(said))
  else if (!("realtimeInput" in said)) live.pending.push(said)
}

function told(room: Room, text: string, turnComplete: boolean): undefined {
  sentLive(room, { clientContent: { turns: [{ role: "user", parts: [{ text }] }], turnComplete } })
}

function textOf(data: unknown): string {
  if (typeof data === "string") return data
  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return new TextDecoder().decode(data as ArrayBuffer)
  }
  return ""
}

function hushed(room: Room): undefined {
  emptied(room.said)
  for (const leg of room.legs.values()) leg.socket.send(JSON.stringify({ event: "clear" }))
}

function heardFromLive(room: Room, ws: WebSocket, data: unknown): undefined {
  let said: Said | null
  try {
    said = objectIn(JSON.parse(textOf(data)))
  } catch {
    return
  }
  if (said === null) return
  const { live } = room
  if (said.setupComplete !== undefined) {
    live.ready = true
    live.reconnects = 0
    for (const one of live.pending.splice(0)) ws.send(JSON.stringify(one))
  }
  const content = objectIn(said.serverContent)
  if (content?.interrupted === true) hushed(room)
  const parts = objectIn(content?.modelTurn)?.parts
  for (const part of Array.isArray(parts) ? parts : []) {
    const audio = textIn(objectIn(objectIn(part)?.inlineData)?.data)
    if (audio !== null) queued(room.said, thirded(samplesOfBytes(bytesOf(audio))))
  }
  const update = objectIn(said.sessionResumptionUpdate)
  const handle = textIn(update?.newHandle)
  if (update?.resumable === true && handle !== null) live.handle = handle
  if (said.goAway !== undefined) ws.close()
  return undefined
}

function connected(room: Room, key: string): undefined {
  const { live } = room
  const ws = new WebSocket(`${LIVE_AT}?key=${encodeURIComponent(key)}`)
  live.ws = ws
  live.ready = false
  ws.binaryType = "arraybuffer"
  ws.onopen = () => {
    const resumed = live.handle === null ? {} : { sessionResumption: { handle: live.handle } }
    ws.send(JSON.stringify({ setup: { ...live.setup, ...resumed } }))
  }
  ws.onmessage = (event) => heardFromLive(room, ws, event.data)
  ws.onclose = (event) => {
    if (room.ending || live.ws !== ws) return
    if (live.reconnects >= RECONNECTS) {
      console.error(`[couples-call] Gemini closed the session (${event.code} ${event.reason})`)
      ended(room)
      return
    }
    live.reconnects += 1
    console.log(`[couples-call] resuming the Gemini session (${event.code} ${event.reason})`)
    connected(room, key)
  }
  return undefined
}

function markedSpeaker(room: Room, heard: ReadonlyMap<Spouse, Int16Array>): undefined {
  for (const leg of room.legs.values()) {
    leg.loud = speaking(heard.get(leg.spouse) ?? new Int16Array(0)) ? leg.loud + 1 : 0
    if (leg.loud !== SPEAKING_FRAMES || room.marked === leg.spouse) continue
    room.marked = leg.spouse
    told(room, `[${NAMED[leg.spouse]} is speaking]`, false)
  }
  return undefined
}

function batchSent(room: Room): undefined {
  const batch = new Int16Array(room.heardBatch.reduce((sum, one) => sum + one.length, 0))
  let at = 0
  for (const one of room.heardBatch) {
    batch.set(one, at)
    at += one.length
  }
  room.heardBatch = []
  const data = base64Of(new Uint8Array(batch.buffer))
  sentLive(room, { realtimeInput: { audio: { data, mimeType: "audio/pcm;rate=16000" } } })
}

function framed(room: Room): undefined {
  const heard = new Map<Spouse, Int16Array>()
  for (const spouse of SPOUSES) {
    const leg = room.legs.get(spouse)
    heard.set(
      spouse,
      leg === undefined ? new Int16Array(FRAME_SAMPLES) : dequeued(leg.heard, FRAME_SAMPLES)
    )
  }
  const said = dequeued(room.said, FRAME_SAMPLES)
  for (const leg of room.legs.values()) {
    const other = heard.get(otherOf(leg.spouse)) ?? new Int16Array(FRAME_SAMPLES)
    const payload = base64Of(muLawOfSamples(mixed(other, said)))
    leg.socket.send(JSON.stringify({ event: "media", media: { payload } }))
  }
  markedSpeaker(room, heard)
  room.heardBatch.push(doubled(mixed(...heard.values())))
  if (room.heardBatch.length >= HEARD_EVERY_FRAMES) batchSent(room)
}

function ticked(room: Room): undefined {
  const due = Math.floor((Date.now() - room.startedAt) / FRAME_MS)
  if (due - room.framesDone > BEHIND_FRAMES) room.framesDone = due - 1
  while (room.framesDone < due) {
    room.framesDone += 1
    framed(room)
  }
  return undefined
}

function ended(room: Room): undefined {
  room.ending = true
  if (room.ticker !== null) clearInterval(room.ticker)
  room.live.ws?.close()
  for (const leg of room.legs.values()) {
    BY_SOCKET.delete(leg.socket)
    leg.socket.close()
  }
  room.legs.clear()
  if (HELD.room === room) HELD.room = null
  console.log("[couples-call] the call ended")
  return undefined
}

async function roomOpened(): Promise<Room | null> {
  if (HELD.room !== null) return HELD.room
  const key = optionalEnv(KEY)
  if (key === undefined) {
    console.error(`[couples-call] nothing holds \`${KEY}\` here`)
    return null
  }
  const pages = await therapistPages()
  if ("refused" in pages) {
    console.error(`[couples-call] the therapist's pages were not read: ${pages.refused}`)
    return null
  }
  const room: Room = {
    legs: new Map(),
    live: {
      ws: null,
      ready: false,
      pending: [],
      handle: null,
      reconnects: 0,
      setup: setupFor(pages),
    },
    said: queueHolding(SAID_HOLDS),
    startedAt: Date.now(),
    ticker: null,
    framesDone: 0,
    heardBatch: [],
    marked: null,
    ending: false,
  }
  HELD.room = room
  connected(room, key)
  room.ticker = setInterval(() => ticked(room), TICK_MS)
  console.log("[couples-call] a call opened")
  return room
}

async function joined(socket: LegSocket, spouse: Spouse): Promise<undefined> {
  HELD.opening ??= roomOpened().finally(() => {
    HELD.opening = null
  })
  const room = HELD.room ?? (await HELD.opening)
  if (room === null) {
    socket.close()
    return
  }
  const earlier = room.legs.get(spouse)
  if (earlier !== undefined) {
    BY_SOCKET.delete(earlier.socket)
    earlier.socket.close()
  }
  const leg: Leg = { spouse, socket, heard: queueHolding(LEG_HOLDS), loud: 0 }
  room.legs.set(spouse, leg)
  BY_SOCKET.set(socket, leg)
  const other = otherOf(spouse)
  const there = room.legs.has(other)
    ? `${NAMED[other]} is on the call too.`
    : `${NAMED[other]} has not joined yet.`
  told(room, `[${NAMED[spouse]} has joined the call. ${there}]`, true)
  console.log(`[couples-call] ${spouse} joined`)
  return undefined
}

export function legClosed(socket: LegSocket): undefined {
  const leg = BY_SOCKET.get(socket)
  BY_SOCKET.delete(socket)
  const room = HELD.room
  if (leg === undefined || room === null || room.legs.get(leg.spouse) !== leg) return
  room.legs.delete(leg.spouse)
  console.log(`[couples-call] ${leg.spouse} left`)
  if (room.legs.size === 0) {
    ended(room)
    return
  }
  told(room, `[${NAMED[leg.spouse]} has left the call.]`, false)
  return undefined
}

export function legSaid(socket: LegSocket, text: string, now = Date.now()): undefined {
  let said: Said | null
  try {
    said = objectIn(JSON.parse(text))
  } catch {
    return
  }
  if (said?.event === "start") {
    const id = textIn(objectIn(said.start)?.call_control_id)
    const spouse = id === null ? null : spouseExpected(id, now)
    if (spouse === null) {
      console.error(`[couples-call] a stream for an unanswered call was turned away (${id})`)
      socket.close()
      return
    }
    void joined(socket, spouse)
    return
  }
  if (said?.event === "media") {
    const media = objectIn(said.media)
    const payload = textIn(media?.payload)
    const leg = BY_SOCKET.get(socket)
    if (leg === undefined || payload === null || media?.track === "outbound") return
    queued(leg.heard, samplesOfMuLaw(bytesOf(payload)))
    return
  }
  if (said?.event === "stop") legClosed(socket)
  return undefined
}
