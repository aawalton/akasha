// THE EDITOR'S HALF OF THE INTERFACE: ONE FILE READ, AND READ AGAIN WHEN THE SERVICE WRITES IT.
//
// The service replaces a line by writing a scratch file and renaming it over the old one, so the
// file is a different inode after every write. Watching the file itself would see one change and
// then go deaf, which is why the folder is watched and the name filtered.
//
// One watcher serves every part of the editor rather than one watcher each. Enough watch events
// arriving together ends the extension host, and five parts watching one folder is five copies of
// every event that folder raises.
//
// There is no timer here. The cooldown that used to be the editor's is the service's now, so what
// arrives has already been collected and a part draws each time it is told.

import { type FSWatcher, readFileSync, watch } from "node:fs"
import { basename, dirname, join } from "node:path"

const PAGES_AT = "alan/harness/code-editor/code-editor-data-interfaces/pages"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.jsonl"

export type Reading = {
  readonly stop: () => undefined
}

export function stateAt(root: string, slug: string): string {
  return join(root, PAGES_AT, `${slug}${STATE_TAIL}`)
}

// A file that is missing, empty or caught mid-rename answers nothing rather than throwing, and
// whoever asked keeps what it last drew. A body that will not parse is a read that raced a rename
// rather than a picture that is wrong, so the next event answers it.
//
// A file holding nothing yet also answers nothing, which is the editor drawing nothing rather than
// waiting: no part has anything to keep before the service has written once.
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

// A rename raises more than one event on some platforms, and the trees are large enough that
// parsing one twice is worth avoiding. A body identical to the last one read is the same picture,
// so nothing is drawn again for it.
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
  // The editor's own exit is what ends this, so the watcher never holds the loop open itself.
  watcher.unref()
  watchers.set(folder, watcher)
  return undefined
}

// What is there now is drawn before any change arrives, so a panel opened long after the last write
// draws what the service holds rather than nothing until the service writes again.
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
