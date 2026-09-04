import { readFileSync } from "node:fs"
import { join } from "node:path"
import { everyPath, readingIn } from "@akasha/indexes"
import type { Answering } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import type { Change } from "@akasha/pages-system/change"
import { pageNamed, partedIn } from "@akasha/pages-system/page-file-name"
import { type Loaded, loadedFrom } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { isMissing } from "@akasha/utils-fs/missing"
import type { Judged, Running, RunningAsync } from "../judging/judging.module.code.ts"

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

export type Input = (path: string, shadow: Shadow) => boolean

export type Selector<T> = {
  readonly named: string
  readonly isInput: Input
  readonly from: (change: Change, shadow: Shadow) => readonly T[]
}

export type Stated = {
  readonly isInput: Input
}

export type Bounded = Running & Stated

export type BoundedAsync = RunningAsync & Stated

const TS = "ts"

const TSX = "tsx"

const TS_ENDING = `.${TS}`

const TSX_ENDING = `.${TSX}`

const CSS = "css"

const CSS_ENDING = `.${CSS}`

const PAGE_TYPES = new WeakMap<Shadow, ReadonlySet<string>>()

function bodiesIn(change: Change): readonly Body[] {
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
  const made = shadow.index.pageTypesIn()
  PAGE_TYPES.set(shadow, made)
  return made
}

export const FILES: Selector<Body> = {
  named: "files",
  isInput: () => true,
  from: (change) => bodiesIn(change),
}

export function textNamed(path: string): boolean {
  return path.endsWith(TS_ENDING) || path.endsWith(TSX_ENDING)
}

export function styleNamed(path: string): boolean {
  return path.endsWith(CSS_ENDING)
}

export function bodyNamed(path: string): boolean {
  return textNamed(path) || styleNamed(path)
}

function textsBy(named: string, taken: (path: string) => boolean): Selector<Text> {
  return {
    named,
    isInput: (path) => taken(path),
    from: (change) => {
      const found: Text[] = []
      for (const given of bodiesIn(change)) {
        if (!taken(given.path)) continue
        found.push({ root: given.root, path: given.path, text: bodyOf(given) })
      }
      return found
    },
  }
}

export const TEXTS: Selector<Text> = textsBy("texts", textNamed)

export const BODIES: Selector<Text> = textsBy("bodies read as text", bodyNamed)

function pagedInside(path: string, shadow: Shadow): boolean {
  return pageNamed(path, pageTypesFor(shadow))
}

export const PAGES: Selector<Paged> = {
  named: "pages",
  isInput: pagedInside,
  from: (change, shadow) => {
    const found: Paged[] = []
    for (const given of bodiesIn(change)) {
      if (!pagedInside(given.path, shadow)) continue
      found.push({ root: given.root, path: given.path, value: loadedFrom(bodyOf(given)) })
    }
    return found
  },
}

export function pagesTailed(slug: string): Selector<Paged> {
  const tailed = (path: string): boolean => partedIn(path)?.pageType === slug
  return {
    named: `pages tailed ${slug}`,
    isInput: (path, shadow) => PAGES.isInput(path, shadow) && tailed(path),
    from: (change, shadow) => PAGES.from(change, shadow).filter((one) => tailed(one.path)),
  }
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
  const stated: Stated = { isInput: selector.isInput }
  return Object.assign(run, stated)
}

export function judgingEachAsync<T extends { readonly path: string }>(
  selector: Selector<T>,
  judge: (given: T, shadow: Shadow) => Promise<readonly string[]>
): BoundedAsync {
  const run = async (change: Change, shadow: Shadow): Promise<readonly Judged[]> => {
    const said: Judged[] = []
    for (const given of selector.from(change, shadow)) {
      for (const reason of await judge(given, shadow)) said.push({ path: given.path, reason })
    }
    return said
  }
  const stated: Stated = { isInput: selector.isInput }
  return Object.assign(run, stated)
}

export function input<T>(selector: Selector<T>, run: Running): Bounded {
  const bound = (change: Change, shadow: Shadow): readonly Judged[] => run(change, shadow)
  const stated: Stated = { isInput: selector.isInput }
  return Object.assign(bound, stated)
}

function overEach(
  taken: (path: string) => boolean,
  found: (path: string, text: string) => readonly string[]
): (given: Body) => readonly string[] {
  return (given) => {
    if (!taken(given.path)) return []
    return found(given.path, bodyOf(given))
  }
}

export function overEachText(
  found: (path: string, text: string) => readonly string[]
): (given: Body) => readonly string[] {
  return overEach(textNamed, found)
}

export function overEachTextAsync(
  found: (path: string, text: string) => Promise<readonly string[]>
): (given: Body) => Promise<readonly string[]> {
  return async (given) => {
    if (!textNamed(given.path)) return []
    return await found(given.path, bodyOf(given))
  }
}

export function overEachBody(
  found: (path: string, text: string) => readonly string[]
): (given: Body) => readonly string[] {
  return overEach(bodyNamed, found)
}

export function judgingEachFile(judge: (given: Body) => readonly string[]): Running {
  return (change) => overEachFile(change, judge)
}

export function overEachFile(
  change: Change,
  judge: (given: Body) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const given of bodiesIn(change)) {
    for (const reason of judge(given)) said.push({ path: given.path, reason })
  }
  return said
}

function filedOnce(paths: readonly string[]): readonly string[] {
  return [...new Set(paths)].sort()
}

export function everyFileIn(given: Reading): readonly string[] {
  return filedOnce(everyPath(given))
}

export function everyFileOf(index: Answering): readonly string[] {
  return filedOnce(index.everyPath())
}

export function everythingIn(root: string): Change {
  const both = onDisk(root)
  return { root, changed: everyFileIn(readingIn(root)), before: both, after: both }
}

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => {
    try {
      return readFileSync(join(root, path))
    } catch (thrown) {
      if (isMissing(thrown)) return null
      throw thrown
    }
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
