import { alanBook } from "akasha/alan/book/alan-book.page-type.ts"
import { bookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.ts"
import { changeFileContentOfAnyKind } from "akasha/change/mechanical/file-content/change/change-file-content-of-any-kind/change-file-content-of-any-kind.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  gathered,
  refusing,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { pathsNaming } from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { addressIn, namedAs, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT_MOST = "at-most"

const CHAPTER = "book-chapter"

const SPELLED = `.${CHAPTER}.md`

const DASHED = "-"

const PREFIX = `${CHAPTER}${DASHED}`

const NUMBERED = /^\d+-(.+)$/

const KINDS: readonly string[] = ["*.md"]

const APART_BY = "/"

const SECTION_OF = "sectionOf"

const SLUG = "slug"

const LINKED = /\]\(([^)#\s]+)\.book-chapter\.md(#[^)\s]*)?\)/g

const POINT = `${changeMechanicalFileContent.slug}/${changeFileContentOfAnyKind.slug}` as const

const PAGE_ENDING = `.${bookSection.slug}.ts`

export type Sections = {
  readonly at: ReadonlyMap<string, string>
  readonly bookOf: ReadonlyMap<string, string>
  readonly named: ReadonlyMap<string, readonly string[]>
}

export function joined(from: string, rest: string): string {
  const parts = from.split(APART_BY)
  for (const one of rest.split(APART_BY)) {
    if (one === "" || one === ".") continue
    if (one === "..") parts.pop()
    else parts.push(one)
  }
  return parts.join(APART_BY)
}

function folderOf(path: string): string {
  const last = path.lastIndexOf(APART_BY)
  return last === -1 ? "" : path.slice(0, last)
}

function nameOf(path: string): string {
  const last = path.lastIndexOf(APART_BY)
  return last === -1 ? path : path.slice(last + 1)
}

function bookIn(
  parents: ReadonlyMap<string, string>,
  address: string,
  seen: Set<string>
): string | null {
  if (seen.has(address)) return null
  seen.add(address)
  const parent = parents.get(address)
  if (parent === undefined) return null
  const named = addressIn(parent)
  if (named.kind === "id" || named.kind === "bare") return null
  if (named.pageTypeSlug === alanBook.slug) return named.slug
  return bookIn(parents, parent, seen)
}

export function sectionsIn(world: World): Sections {
  const at = new Map<string, string>()
  const parents = new Map<string, string>()
  const slugs = new Map<string, string>()
  for (const one of world.index.everyOfType(bookSection.slug)) {
    const value = world.index.pageByPath(one.path)
    if (value === null) continue
    const slug = textAt(value, SLUG)
    const held = textAt(value, SECTION_OF)
    if (slug === null || held === null) continue
    const scope = slugIn(held)
    if (scope === null) continue
    const address = namedAs(bookSection.slug, slug, scope)
    at.set(one.path, address)
    parents.set(address, held)
    slugs.set(address, slug)
  }
  const bookOf = new Map<string, string>()
  const named = new Map<string, string[]>()
  for (const [address, slug] of slugs) {
    const book = bookIn(parents, address, new Set<string>())
    if (book === null) continue
    bookOf.set(address, book)
    const key = `${book}${APART_BY}${slug}`
    const held = named.get(key)
    if (held === undefined) named.set(key, [address])
    else held.push(address)
  }
  return { at, bookOf, named }
}

export function pointedIn(sections: Sections, path: string, text: string): string | null {
  const from = sections.at.get(pageBeside(path))
  const book = from === undefined ? null : (sections.bookOf.get(from) ?? null)
  const own = from === undefined ? null : slugIn(from)
  let moved = false
  const now = text.replace(LINKED, (whole, target: string, anchor: string | undefined) => {
    const address = reachedBy(sections, path, target, book, own)
    if (address === null) return whole
    moved = true
    return `](${address}${anchor ?? ""})`
  })
  return moved ? now : null
}

function pageBeside(path: string): string {
  const cut = path.indexOf(`.${bookSection.slug}.`)
  return cut === -1 ? path : `${path.slice(0, cut)}${PAGE_ENDING}`
}

function namesTried(target: string): readonly string[] {
  const at = target.lastIndexOf(APART_BY)
  const folder = at === -1 ? "" : target.slice(0, at + 1)
  return [target, `${folder}${PREFIX}${nameOf(target)}`]
}

export function flattened(target: string): string {
  const parts: string[] = []
  for (const one of target.split(APART_BY)) {
    if (one === "" || one === "." || one === "..") continue
    parts.push(one)
  }
  return parts.join(DASHED)
}

function unnumbered(name: string): string | null {
  return firstCapture(NUMBERED.exec(name))
}

function waysTo(name: string): readonly string[] {
  const said = [name, `${PREFIX}${name}`]
  const bare = unnumbered(name)
  if (bare !== null) said.push(bare)
  return said
}

function slugsTried(target: string, own: string | null): readonly string[] {
  const said: string[] = [...waysTo(nameOf(target)), ...waysTo(flattened(target))]
  if (own !== null) {
    const under = joined(folderOf(own.split(DASHED).join(APART_BY)), target)
    said.push(...waysTo(flattened(under)))
  }
  return said
}

function reachedBy(
  sections: Sections,
  path: string,
  target: string,
  book: string | null,
  own: string | null
): string | null {
  for (const one of namesTried(target)) {
    const found = sections.at.get(`${joined(folderOf(path), one)}${PAGE_ENDING}`)
    if (found !== undefined) return found
  }
  if (book === null) return null
  for (const one of slugsTried(target, own)) {
    const held = sections.named.get(`${book}${APART_BY}${one}`)
    if (held !== undefined && held.length === 1) return held[0] ?? null
  }
  return null
}

export async function pointBookLinksAtSections(
  world: World,
  atMost: number | null
): Promise<Answer> {
  const sections = sectionsIn(world)
  const answers: Answer[] = []
  for (const path of pathsNaming(world, [SPELLED], KINDS)) {
    if (atMost !== null && answers.length >= atMost) break
    const text = world.textOf(path)
    if (text === null) continue
    const now = pointedIn(sections, path, text)
    if (now === null) continue
    answers.push((await reach(world, POINT, { at: path, old: text, new: now })).said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  for (const key of Object.keys(given)) {
    if (key !== AT_MOST) return refusing(untaken(key, takes))
  }
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await pointBookLinksAtSections(world, atMost)
}
