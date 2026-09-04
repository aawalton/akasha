import { z } from "zod"
import { type RawLine, unquote } from "../k8s-manifest-walker/k8s-manifest-walker.module.code.ts"

export interface MemoryProbe {
  readonly value: string
  readonly line: number
}

export type ContainerListKey = "containers" | "initContainers" | "ephemeralContainers"

export interface ContainerResources {
  readonly containerName: string | undefined
  readonly listKey: ContainerListKey
  readonly line: number
  readonly requestMemory: MemoryProbe | undefined
  readonly limitMemory: MemoryProbe | undefined
}

export const CONTAINER_LIST_KEYS: readonly ContainerListKey[] = [
  "containers",
  "initContainers",
  "ephemeralContainers",
]

const CONTAINER_LIST_OPENERS: ReadonlyMap<string, ContainerListKey> = new Map(
  CONTAINER_LIST_KEYS.map((key) => [`${key}:`, key])
)

const MEMORY_LINE_RE = /^memory:\s*["']?(\S+?)["']?\s*$/
const NAME_LINE_RE = /^(?:-\s*)?name:\s*(.+)$/

const LineCapture = z.tuple([z.string()])

function parseLineCapture(match: RegExpExecArray | null): string | null {
  if (match === null) return null
  const [captured] = LineCapture.parse(match.slice(1))
  return captured
}

interface OpenContainer {
  containerName: string | undefined
  requestMemory: MemoryProbe | undefined
  limitMemory: MemoryProbe | undefined
  readonly line: number
}

export function readContainerProbes(
  lines: readonly RawLine[],
  span: { readonly startIndex: number; readonly endIndex: number }
): readonly ContainerResources[] {
  const out: ContainerResources[] = []

  let listKey: ContainerListKey | undefined
  let listIndent = 0
  let itemIndent: number | undefined
  let awaitingFirstItem = false
  let open: OpenContainer | undefined
  let resourcesIndent: number | undefined
  let inRequests = false
  let inLimits = false

  const closeItem = (): undefined => {
    if (open !== undefined && listKey !== undefined) {
      out.push({
        containerName: open.containerName,
        listKey,
        line: open.line,
        requestMemory: open.requestMemory,
        limitMemory: open.limitMemory,
      })
    }
    open = undefined
    resourcesIndent = undefined
    inRequests = false
    inLimits = false
  }

  const closeList = (): undefined => {
    closeItem()
    listKey = undefined
    itemIndent = undefined
    awaitingFirstItem = false
  }

  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    const stripped = ln.stripped.trimStart()
    const indent = ln.indent
    const isSequenceItem = stripped === "-" || stripped.startsWith("- ")

    if (
      listKey !== undefined &&
      (indent < listIndent || (indent === listIndent && !isSequenceItem))
    )
      closeList()

    const opened = CONTAINER_LIST_OPENERS.get(stripped)
    if (opened !== undefined) {
      closeList()
      listKey = opened
      listIndent = indent
      awaitingFirstItem = true
      continue
    }

    if (listKey === undefined) continue

    if (awaitingFirstItem) {
      awaitingFirstItem = false
      if (!isSequenceItem || indent < listIndent) {
        closeList()
        continue
      }
    }

    const startsContainer =
      isSequenceItem && (itemIndent === undefined || indent === itemIndent) && indent >= listIndent
    if (startsContainer) {
      closeItem()
      itemIndent = indent
      open = {
        containerName: undefined,
        requestMemory: undefined,
        limitMemory: undefined,
        line: ln.lineNumber,
      }
    }

    if (open === undefined || itemIndent === undefined) continue

    if (resourcesIndent !== undefined && indent <= resourcesIndent && !startsContainer) {
      resourcesIndent = undefined
      inRequests = false
      inLimits = false
    }

    if (resourcesIndent === undefined && open.containerName === undefined) {
      const raw = parseLineCapture(NAME_LINE_RE.exec(stripped))
      const isOwnName = startsContainer || (!isSequenceItem && indent === itemIndent + 2)
      if (raw !== null && isOwnName) open.containerName = unquote(raw.trim())
    }

    if (stripped === "resources:") {
      resourcesIndent = indent
      inRequests = false
      inLimits = false
      continue
    }

    if (resourcesIndent === undefined) continue

    if (stripped === "requests:") {
      inRequests = true
      inLimits = false
      continue
    }
    if (stripped === "limits:") {
      inLimits = true
      inRequests = false
      continue
    }

    const value = parseLineCapture(MEMORY_LINE_RE.exec(stripped))
    if (value !== null) {
      const probe: MemoryProbe = { value, line: ln.lineNumber }
      if (inRequests) open.requestMemory = probe
      else if (inLimits) open.limitMemory = probe
    }
  }

  closeList()
  return out
}
