export type InteractionToken = {
  readonly interactionId: string
  readonly startTimeStamp: number
  readonly startNow: number
}

export type PageCardPerfEntry = {
  interactionId: string
  pageId: string
  propertyId: string
  startTimeStamp: number
  startNow: number
  mutationId: string | null
  visibleMs: number | null
  pgliteMs: number | null
  roundTripMs: number | null
}

export type PageCardPerf = {
  entries: ReadonlyArray<PageCardPerfEntry>
}

type Stage = "visible" | "pglite" | "round-trip"

const MARK_PREFIX = "page-card.interaction:"
const BUFFER_CAP = 200

const entriesById = new Map<string, PageCardPerfEntry>()
const INSERTION_ORDER: string[] = []

function newInteractionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `iid-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function safeMark(name: string): undefined {
  try {
    if (typeof performance !== "undefined" && typeof performance.mark === "function") {
      performance.mark(name)
    }
  } catch {}
  return undefined
}

function safeMeasure(name: string, startMark: string, endMark: string): undefined {
  try {
    if (typeof performance !== "undefined" && typeof performance.measure === "function") {
      performance.measure(name, startMark, endMark)
    }
  } catch {}
  return undefined
}

function markStart(interactionId: string): string {
  const name = `${MARK_PREFIX}${interactionId}:start`
  safeMark(name)
  return name
}

function markAndMeasureStage(interactionId: string, stage: Stage): undefined {
  const stageName = `${MARK_PREFIX}${interactionId}:${stage}`
  const startName = `${MARK_PREFIX}${interactionId}:start`
  safeMark(stageName)
  safeMeasure(stageName, startName, stageName)
  return undefined
}

function evictIfFull(): undefined {
  while (INSERTION_ORDER.length > BUFFER_CAP) {
    const oldest = INSERTION_ORDER.shift()
    if (oldest !== undefined) {
      entriesById.delete(oldest)
    }
  }
  return undefined
}

function pushEntry(entry: PageCardPerfEntry): undefined {
  entriesById.set(entry.interactionId, entry)
  INSERTION_ORDER.push(entry.interactionId)
  evictIfFull()
  return undefined
}

function stageMs(token: InteractionToken): number {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    const delta = performance.now() - token.startNow
    return delta < 0 ? 0 : delta
  }
  return 0
}

export function startInteraction(args: {
  pageId: string
  propertyId: string
  eventTimeStamp: number
}): InteractionToken {
  installWindowGlobals()
  const interactionId = newInteractionId()
  const startNow =
    typeof performance !== "undefined" && typeof performance.now === "function"
      ? performance.now()
      : 0

  const token: InteractionToken = {
    interactionId,
    startTimeStamp: args.eventTimeStamp,
    startNow,
  }

  const entry: PageCardPerfEntry = {
    interactionId,
    pageId: args.pageId,
    propertyId: args.propertyId,
    startTimeStamp: args.eventTimeStamp,
    startNow,
    mutationId: null,
    visibleMs: null,
    pgliteMs: null,
    roundTripMs: null,
  }

  pushEntry(entry)
  markStart(interactionId)

  return token
}

export function bindMutationId(token: InteractionToken, mutationId: string): undefined {
  const entry = entriesById.get(token.interactionId)
  if (entry === undefined) {
    return undefined
  }
  entry.mutationId = mutationId
  return undefined
}

export function recordVisibleUpdate(token: InteractionToken): undefined {
  const entry = entriesById.get(token.interactionId)
  if (entry === undefined) {
    return undefined
  }
  entry.visibleMs = stageMs(token)
  markAndMeasureStage(token.interactionId, "visible")
  return undefined
}

export function recordPglitePersisted(token: InteractionToken): undefined {
  const entry = entriesById.get(token.interactionId)
  if (entry === undefined) {
    return undefined
  }
  entry.pgliteMs = stageMs(token)
  markAndMeasureStage(token.interactionId, "pglite")
  return undefined
}

export function recordRoundTripSettled(token: InteractionToken): undefined {
  const entry = entriesById.get(token.interactionId)
  if (entry === undefined) {
    return undefined
  }
  entry.roundTripMs = stageMs(token)
  markAndMeasureStage(token.interactionId, "round-trip")
  return undefined
}

export function findTokenByMutationId(mutationId: string): InteractionToken | null {
  for (const id of INSERTION_ORDER) {
    const entry = entriesById.get(id)
    if (entry !== undefined && entry.mutationId === mutationId) {
      return {
        interactionId: entry.interactionId,
        startTimeStamp: entry.startTimeStamp,
        startNow: entry.startNow,
      }
    }
  }
  return null
}

function snapshotEntries(): ReadonlyArray<PageCardPerfEntry> {
  const out: PageCardPerfEntry[] = []
  for (const id of INSERTION_ORDER) {
    const entry = entriesById.get(id)
    if (entry !== undefined) {
      out.push({ ...entry })
    }
  }
  return out
}

export function getPageCardPerf(): PageCardPerf {
  installWindowGlobals()
  return { entries: snapshotEntries() }
}

export function clearPageCardPerf(): undefined {
  installWindowGlobals()
  try {
    if (typeof performance !== "undefined") {
      const seen: string[] = []
      if (typeof performance.getEntriesByType === "function") {
        for (const e of performance.getEntriesByType("mark")) {
          if (e.name.startsWith(MARK_PREFIX)) {
            seen.push(e.name)
          }
        }
        for (const e of performance.getEntriesByType("measure")) {
          if (e.name.startsWith(MARK_PREFIX)) {
            seen.push(e.name)
          }
        }
      }
      if (typeof performance.clearMarks === "function") {
        for (const name of seen) {
          try {
            performance.clearMarks(name)
          } catch {}
        }
      }
      if (typeof performance.clearMeasures === "function") {
        for (const name of seen) {
          try {
            performance.clearMeasures(name)
          } catch {}
        }
      }
    }
  } catch {}

  entriesById.clear()
  INSERTION_ORDER.length = 0
  return undefined
}

declare global {
  interface Window {
    __pageCardPerf?: PageCardPerf
    getPageCardPerf?: () => PageCardPerf
    clearPageCardPerf?: () => undefined
  }
}

let WINDOW_INSTALLED = false

function installWindowGlobals(): undefined {
  if (typeof window === "undefined") {
    return undefined
  }
  if (WINDOW_INSTALLED) {
    return undefined
  }
  WINDOW_INSTALLED = true

  Object.defineProperty(window, "__pageCardPerf", {
    configurable: true,
    enumerable: true,
    get(): PageCardPerf {
      return { entries: snapshotEntries() }
    },
  })
  window.getPageCardPerf = getPageCardPerf
  window.clearPageCardPerf = clearPageCardPerf
  return undefined
}

installWindowGlobals()
