import { type FSWatcher, readFileSync, watch } from "node:fs"
import { basename, dirname, join } from "node:path"

const PAGES_AT = "alan/harness/code-editor/code-editor-data-interfaces/pages"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.json"

export type Reading = {
  readonly stop: () => undefined
}

export function stateAt(root: string, slug: string): string {
  return join(root, PAGES_AT, slug, `${slug}${STATE_TAIL}`)
}

export function readState<Held>(at: string): Held | null {
  let body: string
  try {
    body = readFileSync(at, "utf8")
  } catch {
    return null
  }
  return parseState<Held>(body)
}

function parseState<Held>(body: string): Held | null {
  const line = body.trimEnd()
  if (line === "") return null
  try {
    return JSON.parse(line) as Held
  } catch {
    return null
  }
}

type Listener = {
  readonly name: string
  readonly at: string
  lastBody: string | null
  readonly draw: (held: unknown) => undefined
}

const listeners = new Map<string, Set<Listener>>()
const watchers = new Map<string, FSWatcher>()

function tell(listener: Listener): undefined {
  let body: string
  try {
    body = readFileSync(listener.at, "utf8")
  } catch {
    return undefined
  }
  if (body === listener.lastBody) return undefined
  const held = parseState<unknown>(body)
  if (held === null) return undefined
  listener.lastBody = body
  listener.draw(held)
  return undefined
}

function watchFolder(folder: string): undefined {
  if (watchers.has(folder)) return undefined
  const watcher = watch(folder, (_kind, name) => {
    if (name === null) return
    const here = listeners.get(folder)
    if (here === undefined) return
    for (const listener of here) {
      if (listener.name === name) tell(listener)
    }
  })
  watcher.unref()
  watchers.set(folder, watcher)
  return undefined
}

export function followState<Held>(
  root: string,
  slug: string,
  draw: (held: Held) => undefined
): Reading {
  const at = stateAt(root, slug)
  const folder = dirname(at)
  const listener: Listener = {
    name: basename(at),
    at,
    lastBody: null,
    draw: draw as (held: unknown) => undefined,
  }
  const here = listeners.get(folder) ?? new Set<Listener>()
  here.add(listener)
  listeners.set(folder, here)
  watchFolder(folder)
  tell(listener)
  return {
    stop: (): undefined => {
      const held = listeners.get(folder)
      if (held === undefined) return undefined
      held.delete(listener)
      if (held.size > 0) return undefined
      listeners.delete(folder)
      watchers.get(folder)?.close()
      watchers.delete(folder)
      return undefined
    },
  }
}
