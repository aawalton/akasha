import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  pathsSearched,
  pathsTyped,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import type {
  Judged,
  Running,
  RunningAsync,
} from "akasha/check/modules/judging/judging.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { sortedOnce } from "akasha/code/type/narrowing/modules/sorted-once/sorted-once.module.code.ts"
import { isMissing } from "akasha/file/disk/modules/missing/missing.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  pageNamed,
  pageOf,
  partedIn,
  uncommittedHeld,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { type Loaded, loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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
  readonly from: (change: Change, shadow: Shadow) => Iterable<T>
}

export type Stated = {
  readonly isInput: Input
}

export type Bounded = Running & Stated

export type BoundedAsync = RunningAsync & Stated

const CSS = "css"

const CSS_ENDING = `.${CSS}`

const TS = ".ts"

const PAGE_TYPES = new WeakMap<Shadow, ReadonlySet<string>>()

function* bodiesIn(change: Change, taken: (path: string) => boolean): Iterable<Body> {
  for (const path of change.changed) {
    if (!taken(path)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    yield { root: change.root, path, bytes }
  }
}

export function pageTypesFor(shadow: Shadow): ReadonlySet<string> {
  const found = PAGE_TYPES.get(shadow)
  if (found !== undefined) return found
  const made = shadow.index.pageTypesIn()
  PAGE_TYPES.set(shadow, made)
  return made
}

const CHANGE = "change"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const EXTENDS = "extends"

const PARTED_BY = "/"

function slugOf(address: string): string {
  const cut = address.indexOf(PARTED_BY)
  return cut < 0 ? address : address.slice(cut + 1)
}

function reachesChange(
  slug: string,
  above: ReadonlyMap<string, readonly string[]>,
  seen: Set<string>
): boolean {
  if (slug === CHANGE) return true
  if (seen.has(slug)) return false
  seen.add(slug)
  return (above.get(slug) ?? []).some((one) => reachesChange(one, above, seen))
}

export function changesSparing(index: Answering): ReadonlySet<string> {
  const above = new Map<string, readonly string[]>()
  for (const listed of index.everyOfType(PAGE_TYPE)) {
    const value = index.pageByPath(listed.path)
    if (value === null) continue
    const slug = textAt(value, SLUG)
    if (slug === null) continue
    above.set(slug, (textsAt(value, EXTENDS) ?? []).map(slugOf))
  }
  const found = new Set<string>()
  for (const slug of above.keys()) {
    if (slug !== CHANGE && reachesChange(slug, above, new Set())) found.add(slug)
  }
  return found
}

export function filesBy(named: string, taken: Input): Selector<Body> {
  return {
    named,
    isInput: taken,
    from: function* (change, shadow) {
      for (const path of change.changed) {
        if (!taken(path, shadow)) continue
        const bytes = change.after(path)
        if (bytes === null) continue
        yield { root: change.root, path, bytes }
      }
    },
  }
}

export const FILES: Selector<Body> = filesBy("files", () => true)

export function textNamed(path: string): boolean {
  return typeScripted(path)
}

export function styleNamed(path: string): boolean {
  return path.endsWith(CSS_ENDING)
}

export function bodyNamed(path: string): boolean {
  return textNamed(path) || styleNamed(path)
}

export function textsBy(named: string, taken: Input): Selector<Text> {
  return {
    named,
    isInput: (path, shadow) => taken(path, shadow),
    from: function* (change, shadow) {
      for (const path of change.changed) {
        if (!taken(path, shadow)) continue
        const text = textIn(change, path)
        if (text === null) continue
        yield { root: change.root, path, text }
      }
    },
  }
}

export const TEXTS: Selector<Text> = textsBy("texts", textNamed)

export const BODIES: Selector<Text> = textsBy("bodies read as text", bodyNamed)

function pagedInside(path: string, shadow: Shadow): boolean {
  return pageNamed(path, pageTypesFor(shadow))
}

export function pagesBy(named: string, taken: Input): Selector<Paged> {
  return {
    named,
    isInput: (path, shadow) => pagedInside(path, shadow) && taken(path, shadow),
    from: function* (change, shadow) {
      for (const path of change.changed) {
        if (!pagedInside(path, shadow) || !taken(path, shadow)) continue
        const text = textIn(change, path)
        if (text === null) continue
        yield { root: change.root, path, value: loadedFrom(text) }
      }
    },
  }
}

export const PAGES: Selector<Paged> = pagesBy("pages", () => true)

const ROWED = new WeakMap<Shadow, ReadonlySet<string>>()

function rowKeysIn(shadow: Shadow): ReadonlySet<string> {
  const found = ROWED.get(shadow)
  if (found !== undefined) return found
  const made = new Set<string>()
  for (const held of shadow.index.shapesAt().values()) {
    if (held.pageTypeSlug === ENTRY_PROPERTY) made.add(held.propertySlug)
  }
  ROWED.set(shadow, made)
  return made
}

export function pageOfRow(path: string, shadow: Shadow): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length === 0) return null
  const key = said.sections[0]
  if (key === undefined || !rowKeysIn(shadow).has(key)) return null
  const at = join(dirname(path), `${pageOf(said)}${TS}`)
  return shadow.pageOf(at) === null ? null : at
}

function rowNamed(path: string, shadow: Shadow): boolean {
  return pageOfRow(path, shadow) !== null
}

export const PAGES_WITH_ROWS: Selector<Paged> = {
  ...PAGES,
  named: "pages and the entry files beside them",
  isInput: (path, shadow) => pagedInside(path, shadow) || rowNamed(path, shadow),
}

export function pagesTailed(slug: string): Selector<Paged> {
  const tailed = (path: string): boolean => partedIn(path)?.pageType === slug
  return pagesBy(`pages tailed ${slug}`, (path) => tailed(path))
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

export function takenIn(takes: Input | null, paths: readonly string[], shadow: Shadow): boolean {
  if (takes === null) return true
  try {
    return paths.some((path) => takes(path, shadow))
  } catch {
    return true
  }
}

export function input<T>(selector: Selector<T>, run: Running): Bounded {
  const bound = (change: Change, shadow: Shadow): readonly Judged[] =>
    takenIn(selector.isInput, change.changed, shadow) ? run(change, shadow) : []
  const stated: Stated = { isInput: selector.isInput }
  return Object.assign(bound, stated)
}

export function inputAsync<T>(selector: Selector<T>, run: RunningAsync): BoundedAsync {
  const bound = async (change: Change, shadow: Shadow): Promise<readonly Judged[]> =>
    takenIn(selector.isInput, change.changed, shadow) ? await run(change, shadow) : []
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

export function overEachFile(
  change: Change,
  taken: (path: string) => boolean,
  judge: (given: Body) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const given of bodiesIn(change, taken)) {
    for (const reason of judge(given)) said.push({ path: given.path, reason })
  }
  return said
}

export function overEveryIn(
  change: Change,
  taken: (path: string) => boolean,
  judge: (path: string, text: string) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!taken(path)) continue
    const text = textIn(change, path)
    if (text === null) continue
    for (const reason of judge(path, text)) said.push({ path, reason })
  }
  return said
}

export function overEveryNamed(
  root: string,
  taken: (path: string) => boolean,
  judge: (path: string, text: string) => readonly string[]
): readonly Judged[] {
  return overEveryIn(everythingIn(root), taken, judge)
}

export function overEveryText(
  root: string,
  judge: (path: string, text: string) => readonly string[]
): readonly Judged[] {
  return overEveryNamed(root, textNamed, judge)
}

export function overEveryBody(
  root: string,
  judge: (path: string, text: string) => readonly string[]
): readonly Judged[] {
  return overEveryNamed(root, bodyNamed, judge)
}

export function overEveryTextNaming(
  root: string,
  asked: readonly string[],
  judge: (path: string, text: string) => readonly string[]
): readonly Judged[] {
  const both = onDisk(root)
  const changed = pathsSearched(root, asked, TYPED_KINDS, ONE_THREAD).toSorted()
  return overEveryIn({ root, changed, before: both, after: both }, textNamed, judge)
}

const VENDORED = "node_modules"

function walked(root: string, asked: readonly string[]): readonly string[] {
  const done = ran(["git", "-C", root, "ls-files", "-z", "--exclude-standard", ...asked])
  if (done.code !== 0) {
    throw new Error(`the tree at ${root} could not be walked — ${done.err.trim()}`)
  }
  return done.out.split("\0").filter((one) => one !== "")
}

function heldThough(path: string): boolean {
  return uncommittedHeld(path) && !path.split("/").includes(VENDORED)
}

function everyFileInside(root: string): readonly string[] {
  const kept = walked(root, ["--cached", "--others"])
  const held = walked(root, ["--others", "--ignored"]).filter(heldThough)
  return sortedOnce([...kept, ...held]).filter((one) => !underIndex(one))
}

export function everythingIn(root: string): Change {
  const both = onDisk(root)
  return { root, changed: everyFileInside(root), before: both, after: both }
}

export function nothingIn(root: string): Change {
  const both = onDisk(root)
  return { root, changed: [], before: both, after: both }
}

const ONE_THREAD = 1

export function pagesTypedIn(root: string, types: ReadonlySet<string>): Change {
  const both = onDisk(root)
  const kinds = [...types].map((one) => `*.${one}${TS}`)
  return { root, changed: pathsTyped(root, kinds, ONE_THREAD), before: both, after: both }
}

function isFolder(thrown: unknown): boolean {
  if (thrown === null || typeof thrown !== "object" || !("code" in thrown)) return false
  return thrown.code === "EISDIR"
}

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => {
    try {
      return readFileSync(join(root, path))
    } catch (thrown) {
      if (isMissing(thrown) || isFolder(thrown)) return null
      throw new Error(`${path} is there and would not open — ${String(thrown)}`)
    }
  }
}

export function holdingOver(change: Change): Change {
  const held = new Map<string, Uint8Array | null>()
  return {
    ...change,
    after: (path) => {
      const found = held.get(path)
      if (found !== undefined) return found
      const bytes = change.after(path)
      held.set(path, bytes)
      return bytes
    },
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

export function textWas(change: Change, path: string): string | null {
  const bytes = change.before(path)
  if (bytes === null) return null
  return bodyOf({ root: change.root, path, bytes })
}
