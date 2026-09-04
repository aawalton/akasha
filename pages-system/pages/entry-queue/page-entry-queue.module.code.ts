import { appendFile } from "node:fs/promises"
import { join } from "node:path"
import {
  bytesIn,
  type Filling,
  openedAt,
  rolledInto,
} from "../entry-landing/page-entry-landing.module.code.ts"
import { lineFor } from "../entry-writing/page-entry-writing.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"

type Chunk = { path: string; text: string }

export type Queue = {
  readonly write: (value: Value) => undefined
  readonly at: () => string
  readonly refused: () => string | null
  readonly flushed: () => Promise<void>
}

export type Queued = { readonly queue: Queue } | { readonly refused: string }

function said(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export function queueAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  ceiling: number
): Queued {
  const opened = openedAt(root, page, propertySlug, held)
  if ("refused" in opened) return opened
  let filling: Filling = opened.filling
  let refused: string | null = null
  let waiting: Chunk[] = []
  let draining = false
  let queued: Promise<void> = Promise.resolve()
  const drain = async (): Promise<undefined> => {
    const taken = waiting
    waiting = []
    draining = false
    for (const one of taken) {
      try {
        await appendFile(join(root, one.path), one.text, "utf8")
      } catch (error) {
        refused = `no value reached '${one.path}': ${said(error)}`
      }
    }
  }
  const write = (value: Value): undefined => {
    let line: string
    try {
      line = lineFor(value)
    } catch (error) {
      refused = `no value reached '${filling.path}': ${said(error)}`
      return
    }
    const rolled = rolledInto(page, propertySlug, held, filling, bytesIn(line), ceiling)
    if ("refused" in rolled) {
      refused = rolled.refused
      return
    }
    filling = rolled.filling
    const last = waiting.at(-1)
    if (last !== undefined && last.path === filling.path) last.text += line
    else waiting.push({ path: filling.path, text: line })
    if (draining) return
    draining = true
    queued = queued.then(drain)
  }
  return {
    queue: {
      write,
      at: () => filling.path,
      refused: () => refused,
      flushed: () => queued,
    },
  }
}
