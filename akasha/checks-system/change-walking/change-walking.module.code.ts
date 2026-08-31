import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import {
  type Loaded,
  loadedFrom,
  pageTypesIn,
} from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { everyPathAnswered } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../pages-system/indexes/index-shape/index-shape.module.code.ts"
import { pageNamed } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../pages-system/shadow/shadow.module.code.ts"
import type { Judged, Running } from "../judging/judging.module.code.ts"

export type Body = {
  readonly root: string
  readonly path: string
  readonly bytes: Uint8Array
}

export type Text = {
  readonly root: string
  readonly path: string
  readonly text: string
}

export type Paged = {
  readonly root: string
  readonly path: string
  readonly value: Loaded
}

export type Waking = (path: string, shadow: Shadow) => boolean

export type Selector<T> = {
  readonly named: string
  readonly wakesOn: Waking
  readonly from: (change: Change, shadow: Shadow) => readonly T[]
}

export type Bounded = Running & {
  readonly wakesOn: Waking
}

const TS = "ts"

const TS_ENDING = `.${TS}`

const PAGE_TYPES = new WeakMap<Shadow, ReadonlySet<string>>()

function standingIn(change: Change): readonly Body[] {
  const found: Body[] = []
  for (const path of change.changed) {
    const bytes = change.after(path)
    if (bytes === null) continue
    found.push({ root: change.root, path, bytes })
  }
  return found
}

function pageTypesFor(shadow: Shadow): ReadonlySet<string> {
  const found = PAGE_TYPES.get(shadow)
  if (found !== undefined) return found
  const made = pageTypesIn(shadow.reading)
  PAGE_TYPES.set(shadow, made)
  return made
}

export const FILES: Selector<Body> = {
  named: "files",
  wakesOn: () => true,
  from: (change) => standingIn(change),
}

export const TEXTS: Selector<Text> = {
  named: "texts",
  wakesOn: (path) => path.endsWith(TS_ENDING),
  from: (change) => {
    const found: Text[] = []
    for (const given of standingIn(change)) {
      if (!given.path.endsWith(TS_ENDING)) continue
      found.push({ root: given.root, path: given.path, text: bodyOf(given) })
    }
    return found
  },
}

export const PAGES: Selector<Paged> = {
  named: "pages",
  wakesOn: (path, shadow) => pageNamed(path, pageTypesFor(shadow)),
  from: (change, shadow) => {
    const found: Paged[] = []
    for (const given of standingIn(change)) {
      if (!pageNamed(given.path, pageTypesFor(shadow))) continue
      found.push({ root: given.root, path: given.path, value: loadedFrom(bodyOf(given)) })
    }
    return found
  },
}

export function judgingEach<T extends { readonly path: string }>(
  selector: Selector<T>,
  judge: (given: T, shadow: Shadow) => readonly string[]
): Bounded {
  const run = (change: Change, shadow: Shadow): readonly Judged[] => {
    const said: Judged[] = []
    for (const given of selector.from(change, shadow)) {
      for (const reason of judge(given, shadow)) said.push({ path: given.path, reason })
    }
    return said
  }
  return Object.assign(run, { wakesOn: selector.wakesOn })
}

export function waking<T>(selector: Selector<T>, run: Running): Bounded {
  const bound = (change: Change, shadow: Shadow): readonly Judged[] => run(change, shadow)
  return Object.assign(bound, { wakesOn: selector.wakesOn })
}

export function overEachText(
  found: (path: string, text: string) => readonly string[]
): (given: Body) => readonly string[] {
  return (given) => {
    if (!given.path.endsWith(TS_ENDING)) return []
    return found(given.path, bodyOf(given))
  }
}

export function judgingEachFile(judge: (given: Body) => readonly string[]): Running {
  return (change) => overEachFile(change, judge)
}

export function overEachFile(
  change: Change,
  judge: (given: Body) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const given of standingIn(change)) {
    for (const reason of judge(given)) said.push({ path: given.path, reason })
  }
  return said
}

export function everyFileIn(root: string, given: string | Reading = root): readonly string[] {
  return [...new Set(everyPathAnswered(root, given))].sort()
}

export function everythingIn(root: string): Change {
  const both = onDisk(root)
  return { root, changed: everyFileIn(root), before: both, after: both }
}

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => {
    const full = join(root, path)
    return existsSync(full) ? readFileSync(full) : null
  }
}

export function bodyOf(given: Body): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(given.bytes)
  } catch {
    throw new Error(`${given.path} is not valid UTF-8, so no check could read it`)
  }
}

export function textIn(change: Change, path: string): string | null {
  const bytes = change.after(path)
  if (bytes === null) return null
  return bodyOf({ root: change.root, path, bytes })
}
