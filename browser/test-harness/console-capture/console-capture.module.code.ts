import type { Page } from "playwright-core"

export interface ConsoleEntry {
  readonly kind: "console" | "pageerror"
  readonly type: string
  readonly text: string
  readonly atMs: number
}

export interface ConsoleCapture {
  readonly entries: () => readonly ConsoleEntry[]
  readonly dump: (label?: string) => undefined
  readonly clear: () => undefined
}

const DEFAULT_CAP = 1000
const PREFIX = "[browser console]"

export function formatConsoleDump(
  label: string | undefined,
  entries: readonly ConsoleEntry[],
  droppedCount: number
): readonly string[] {
  const tag = label !== undefined && label !== "" ? `${label}: ` : ""
  if (entries.length === 0) {
    return [`${PREFIX} ${tag}no browser console output or page errors captured`]
  }
  const suffix = droppedCount > 0 ? ` (+${droppedCount} suppressed beyond cap)` : ""
  const header = `${PREFIX} ${tag}${entries.length} entr${
    entries.length === 1 ? "y" : "ies"
  } captured${suffix}`
  const body = entries.map((e) => {
    const channel = e.kind === "pageerror" ? "pageerror" : e.type
    return `${PREFIX}   +${e.atMs}ms ${channel}: ${e.text}`
  })
  return [header, ...body]
}

export interface ConsoleBuffer {
  readonly push: (kind: ConsoleEntry["kind"], type: string, text: string) => undefined
  readonly capture: ConsoleCapture
}

export function createConsoleBuffer(opts?: { cap?: number; now?: () => number }): ConsoleBuffer {
  const cap = opts?.cap ?? DEFAULT_CAP
  const now = opts?.now ?? Date.now
  const startedAt = now()
  let buffer: ConsoleEntry[] = []
  let dropped = 0
  return {
    push: (kind, type, text): undefined => {
      if (buffer.length >= cap) {
        dropped++
        return undefined
      }
      buffer.push({ kind, type, text, atMs: now() - startedAt })
      return undefined
    },
    capture: {
      entries: (): readonly ConsoleEntry[] => buffer,
      dump: (label?: string): undefined => {
        for (const line of formatConsoleDump(label, buffer, dropped)) console.log(line)
        return undefined
      },
      clear: (): undefined => {
        buffer = []
        dropped = 0
        return undefined
      },
    },
  }
}

export function createConsoleCapture(page: Page, opts?: { cap?: number }): ConsoleCapture {
  const { push, capture } = createConsoleBuffer(opts)
  page.on("console", (m) => push("console", m.type(), m.text()))
  page.on("pageerror", (e) => push("pageerror", "exception", e.message))
  return capture
}
