import { akashaRoot, harnessEnvironment } from "../harness-call/harness-call.module.code.ts"
import {
  foldSweep,
  mergeObservation,
  type ObservationPatch,
} from "../observation-merging/observation-merging.module.code.ts"
import {
  bunIn,
  type Writing,
  writerMainIn,
  writingTo,
} from "../observation-writing/observation-writing.module.code.ts"
import { changeKey, type Observation } from "../seat-observations/seat-observations.module.code.ts"

export interface SweepReport {
  readonly swept: number
  readonly read: number
  readonly noProcess: number
  readonly neverAnswered: number
  readonly boundMs: number
  readonly ms: number
  readonly trigger: string
}

export const SETTLE_MS = 250

const WINDOW_PAGE_TYPE = "code-editor-window"

const WRITER = "editor-observations"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

const SAYS = "[editor-observations]"

const REPRESENTS_AN_ORIGIN = "http://127.0.0.1:8787"

interface Writer {
  readonly ask: Fetcher
  readonly dispose: () => Promise<void>
}

function writerFor(window: string, onError?: (message: string) => void): Writer {
  let client: Writing | undefined
  const held = (): Writing => {
    if (client === undefined) {
      client = writingTo({
        bun: bunIn(),
        mainFile: writerMainIn(akashaRoot()),
        env: harnessEnvironment(),
        onNoise: (text) => onError?.(`${SAYS} ${text}`),
      })
    }
    return client
  }
  return {
    ask: async (url, init) => {
      const said = await held().ask({
        act: "patch-state",
        pageType: WINDOW_PAGE_TYPE,
        name: window,
        url,
        method: typeof init.method === "string" ? init.method : "POST",
        headers: (init.headers ?? {}) as Record<string, string>,
        body: typeof init.body === "string" ? init.body : "",
      })
      const body = said.ok ? said.body : { error: said.saying ?? "the observation writer refused" }
      return new Response(JSON.stringify(body), { status: said.status })
    },
    dispose: async () => {
      await client?.dispose()
    },
  }
}

export interface ObservationStore {
  readonly record: (feature: string, patch: ObservationPatch) => void
  readonly recordSweep: (feature: string, report: SweepReport) => void
  readonly current: (feature: string) => Observation | undefined
  readonly flush: () => Promise<void>
  readonly dispose: () => Promise<void>
  readonly url: string
}

export interface StoreOptions {
  readonly window: string
  readonly origin?: string
  readonly fetch?: Fetcher
  readonly now?: () => Date
  readonly settleMs?: number
  readonly onError?: (message: string) => void
}

export function createObservationStore(options: StoreOptions): ObservationStore {
  const now = options.now ?? ((): Date => new Date())
  const settleMs = options.settleMs ?? SETTLE_MS
  const writer: Writer =
    options.fetch === undefined
      ? writerFor(options.window, options.onError)
      : { ask: options.fetch, dispose: async () => undefined }
  const ask = writer.ask
  const url = `${options.origin ?? REPRESENTS_AN_ORIGIN}/patch-state/${WINDOW_PAGE_TYPE}/${options.window}`

  let features: Record<string, Observation> = {}
  let writtenKey = changeKey({})
  let timer: ReturnType<typeof setTimeout> | undefined
  let writing: Promise<void> = Promise.resolve()

  const write = async (): Promise<void> => {
    const key = changeKey(features)
    if (key === writtenKey) {
      return
    }
    const values = { features, "observed-at": now().toISOString() }
    try {
      const response = await ask(url, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ writer: WRITER, values }),
      })
      if (!response.ok) {
        const said = (await response.text().catch(() => "")).trim()
        options.onError?.(`observation write refused: ${response.status} ${said}`)
        return
      }
    } catch (err) {
      options.onError?.(`observation write failed: ${String(err)}`)
      return
    }
    writtenKey = key
  }

  const schedule = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = undefined
      writing = writing.then(write)
    }, settleMs)
  }

  const self: ObservationStore = {
    url,

    current: (feature) => features[feature],

    recordSweep: (feature, report) => {
      self.record(feature, {
        sweep: foldSweep(features[feature]?.sweep, {
          ...report,
          at: now().toISOString(),
        }),
      })
    },

    record: (feature, patch) => {
      const merged = mergeObservation(features[feature], patch, now().toISOString())
      const candidate = { ...features, [feature]: merged }
      if (changeKey(candidate) === changeKey(features)) {
        return
      }
      features = candidate
      if (changeKey(features) === writtenKey) {
        return
      }
      schedule()
    },

    flush: async () => {
      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }
      writing = writing.then(write)
      await writing
    },

    dispose: async () => {
      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }
      writing = writing.then(write)
      await writing.catch(() => undefined)
      await writer.dispose().catch(() => undefined)
    },
  }
  return self
}

let store: ObservationStore | undefined

export function setObservationStore(next: ObservationStore | undefined): void {
  store = next
}

export function recordObservation(feature: string, patch: ObservationPatch): void {
  store?.record(feature, patch)
}

export function recordSweep(feature: string, report: SweepReport): void {
  store?.recordSweep(feature, report)
}

export function currentObservation(feature: string): Observation | undefined {
  return store?.current(feature)
}
