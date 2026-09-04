import { readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import { listedByPath, readingIn } from "@akasha/indexes"
import type { Reading } from "@akasha/indexes/shape"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import type { Value } from "@akasha/pages-system/page-value"
import ts from "typescript"
import { counted } from "../../../asking/asking.module.code.ts"
import { splicedIn } from "../../refactor/type-renaming/type-renaming.module.code.ts"

const PART_SLUGS = "partSlugs"

const DOMAIN = "domain"

const PAGE_TYPE = "page-type"

const PLURAL_SLUG = "pluralSlug"

const HELD_FOLDERS = new Set(["modules", "pages", "properties", "scripts"])

const ROOT = ""

const HERE = "."

const EMPTY: ReadonlyMap<string, string> = new Map()

export const PARENT_SPELLING =
  "a page's one parent is the page holding the folder it sits in, so a page carried from one " +
  "folder to another leaves the parts of the page it was under and joins the parts of the page " +
  "it arrives under"

export type Item = { readonly text: string; readonly start: number; readonly end: number }

export type Listing = { readonly open: number; readonly items: readonly Item[] }

function keyOf(one: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(one)) return null
  return ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
}

function listedIn(source: ts.SourceFile, array: ts.ArrayLiteralExpression): Listing | null {
  const items: Item[] = []
  for (const element of array.elements) {
    if (!ts.isStringLiteral(element)) return null
    items.push({ text: element.text, start: element.getStart(source), end: element.getEnd() })
  }
  return { open: array.getStart(source) + 1, items }
}

export function listingIn(path: string, text: string): Listing | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held === null) continue
      for (const property of held.properties) {
        if (keyOf(property) !== PART_SLUGS || !ts.isPropertyAssignment(property)) continue
        const array = property.initializer
        return ts.isArrayLiteralExpression(array) ? listedIn(source, array) : null
      }
      return null
    }
  }
  return null
}

function blank(said: string | undefined): boolean {
  return said === " " || said === "\t"
}

function lineOpen(text: string, at: number): number {
  let start = at
  while (start > 0 && text[start - 1] !== "\n") start -= 1
  return start
}

function indentAt(text: string, at: number): string | null {
  const said = text.slice(lineOpen(text, at), at)
  return said.trim() === "" ? said : null
}

export function withoutPart(path: string, text: string, named: readonly string[]): string | null {
  const listing = listingIn(path, text)
  if (listing === null) return null
  const item = listing.items.find((one) => named.includes(one.text))
  if (item === undefined) return null
  let end = item.end
  while (blank(text[end])) end += 1
  const comma = text[end] === ","
  if (comma) end += 1
  let start = item.start
  if (comma) {
    while (blank(text[end])) end += 1
  } else {
    let back = item.start
    while (back > 0 && blank(text[back - 1])) back -= 1
    if (text[back - 1] === ",") start = back - 1
  }
  const open = lineOpen(text, start)
  if (open > 0 && indentAt(text, start) !== null) start = open - 1
  return splicedIn(text, [[{ start, end }, ""]])
}

function spliced(text: string, at: number, said: string): string {
  return splicedIn(text, [[{ start: at, end: at }, said]])
}

function afterLast(text: string, last: Item, said: string): string {
  const indent = indentAt(text, last.start)
  if (indent === null) return spliced(text, last.end, `, ${said}`)
  let end = last.end
  while (blank(text[end])) end += 1
  if (text[end] === ",") end += 1
  return spliced(text, end, `\n${indent}${said},`)
}

export function withPart(path: string, text: string, address: string): string | null {
  const listing = listingIn(path, text)
  if (listing === null) return null
  if (listing.items.some((one) => one.text === address)) return text
  const said = JSON.stringify(address)
  const after = listing.items.find((one) => one.text > address)
  if (after !== undefined) {
    const indent = indentAt(text, after.start)
    if (indent === null) return spliced(text, after.start, `${said}, `)
    return spliced(text, lineOpen(text, after.start), `${indent}${said},\n`)
  }
  const last = listing.items[listing.items.length - 1]
  if (last !== undefined) return afterLast(text, last, said)
  const outer = indentAt(text, lineOpen(text, listing.open)) ?? ""
  return spliced(text, listing.open, `\n${outer}  ${said},\n${outer}`)
}

export type Holder = {
  readonly at: string
  readonly was: string
  readonly address: string
  readonly pageType: string
  readonly slug: string
}

export type Held = { readonly holders: readonly Holder[] } | { readonly unheld: string }

export type Placing = {
  readonly reading: Reading
  readonly moved: ReadonlyMap<string, string>
  readonly root: string
  readonly valueAt: (path: string) => Value | null
}

export function ownFile(placing: Placing, was: string): boolean {
  return listedByPath(placing.reading, was).some((one) => one.path === was)
}

function holderFor(placing: Placing, at: string, was: string): Holder | null {
  if (!ownFile(placing, was)) return null
  const said = partedIn(at)
  if (said === null) return null
  return {
    at,
    was,
    address: `${said.pageType}/${said.slug}`,
    pageType: said.pageType,
    slug: said.slug,
  }
}

export function filesIn(placing: Placing, folder: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  let held: readonly string[] = []
  try {
    held = readdirSync(join(placing.root, folder), { withFileTypes: true })
      .filter((one) => one.isFile())
      .map((one) => one.name)
  } catch {
    held = []
  }
  for (const name of held) {
    const path = folder === ROOT ? name : `${folder}/${name}`
    if (!placing.moved.has(path)) found.set(path, path)
  }
  for (const [from, to] of placing.moved) {
    if (dirname(to) === (folder === ROOT ? HERE : folder)) found.set(to, from)
  }
  return found
}

export function pagesIn(placing: Placing, folder: string): readonly Holder[] {
  const found: Holder[] = []
  for (const [at, was] of [...filesIn(placing, folder)].sort()) {
    const one = holderFor(placing, at, was)
    if (one !== null) found.push(one)
  }
  return found
}

function pluralOf(placing: Placing, one: Holder): string | null {
  if (one.pageType !== PAGE_TYPE) return null
  const value = placing.valueAt(one.was)
  const said = value === null ? null : value[PLURAL_SLUG]
  return typeof said === "string" && said !== "" ? said : null
}

export function holdingIn(placing: Placing, held: readonly Holder[]): readonly Holder[] {
  if (held.length < 2) return held
  const kept = held.filter(
    (one) => !held.some((two) => two.at !== one.at && holdsPart(placing, two, [one.address]))
  )
  return kept.length === 1 ? kept : []
}

function namesOf(placing: Placing, held: readonly Holder[]): readonly string[] {
  const one = held[0]
  if (one === undefined) return []
  const plural = pluralOf(placing, one)
  return plural === null ? [one.slug] : [one.slug, plural]
}

export function holdersFor(placing: Placing, folder: string, moved: string): Held {
  const crossed: string[] = []
  let at = folder
  for (;;) {
    if (at === ROOT || at === HERE || at === "/") {
      return { unheld: crossed.join(", ") }
    }
    const held = pagesIn(placing, at).filter((one) => one.at !== moved)
    const holding = holdingIn(placing, held)
    const named = basename(at)
    const grouping = HELD_FOLDERS.has(named) && !namesOf(placing, holding).includes(named)
    if (!grouping && holding.length > 0) return { holders: holding }
    crossed.push(at)
    at = dirname(at)
    if (at === HERE) at = ROOT
  }
}

export function holdsPart(placing: Placing, one: Holder, named: readonly string[]): boolean {
  const value = placing.valueAt(one.was)
  const said = value === null ? null : value[PART_SLUGS]
  if (!Array.isArray(said)) return false
  return said.some((held) => typeof held === "string" && named.includes(held))
}

export type Parenting = {
  readonly path: string
  readonly address: string
  readonly named: readonly string[]
  readonly leaving: Holder
  readonly joining: Holder
}

const NOTHING: Parented = { parentings: [], unread: null }

export type Parented =
  | { readonly parentings: readonly Parenting[]; readonly unread: string | null }
  | { readonly refusals: readonly string[] }

function unheldSaid(path: string, address: string, crossed: string, side: string): string {
  return (
    `${path} ${side} a folder no page holds — ${PARENT_SPELLING}, and no page's own file is in ` +
    `${crossed} or in any folder above them up to the repository root, so nothing here could ` +
    `name \`${address}\` among its parts. Carry the page that is to hold that folder there first, ` +
    "or name a destination a page already holds"
  )
}

function heldBy(held: readonly Holder[]): string {
  return held.map((one) => one.at).join(" and ")
}

function outOf(from: string, address: string, held: readonly Holder[]): string {
  return (
    `${from} was in \`${dirname(from)}\`, which ${heldBy(held)} holds, and no page holding that ` +
    `folder names \`${address}\` among its parts — ${PARENT_SPELLING}, and the page this would ` +
    `take \`${address}\` out of cannot be told, so nothing here is repointed`
  )
}

export function partedFor(
  placing: Placing,
  under: ReadonlySet<string>,
  from: string,
  to: string
): Parented | null {
  const said = partedIn(to)
  if (said === null || !ownFile(placing, from) || !under.has(said.pageType)) return null
  if (dirname(from) === dirname(to)) return null
  const address = `${said.pageType}/${said.slug}`
  const was = partedIn(from)
  const named = was === null ? [address] : [address, `${was.pageType}/${was.slug}`]
  const target = holdersFor(placing, dirname(to), to)
  if ("unheld" in target) {
    return { refusals: [unheldSaid(to, address, target.unheld, "would arrive in")] }
  }
  if (target.holders.some((one) => holdsPart(placing, one, named))) return NOTHING
  const before = holdersFor({ ...placing, moved: EMPTY }, dirname(from), from)
  if ("unheld" in before) return { refusals: [unheldSaid(from, address, before.unheld, "was in")] }
  const leaving = before.holders.find((one) => holdsPart(placing, one, named))
  if (leaving === undefined) return { refusals: [outOf(from, address, before.holders)] }
  if (target.holders.some((one) => one.was === leaving.was)) return NOTHING
  const joining = target.holders[0]
  if (joining === undefined || target.holders.length > 1) {
    return {
      refusals: [
        `${to} would arrive in \`${dirname(to)}\`, which ${heldBy(target.holders)} hold together, ` +
          `so which of them would name \`${address}\` among its parts cannot be told`,
      ],
    }
  }
  return { parentings: [{ path: to, address, named, leaving, joining }], unread: null }
}

export type Edited = { readonly path: string; readonly was: string; readonly text: string }

export type Edits = { readonly edits: readonly Edited[] } | { readonly refusals: readonly string[] }

export function editedFor(
  held: readonly Parenting[],
  textAt: (path: string, was: string) => string | null
): Edits {
  const refusals: string[] = []
  const found = new Map<string, Edited>()
  const readAt = (one: Holder): string | null => found.get(one.at)?.text ?? textAt(one.at, one.was)
  const put = (one: Holder, text: string): undefined => {
    found.set(one.at, { path: one.at, was: one.was, text })
  }
  for (const one of held) {
    const out = readAt(one.leaving)
    const dropped = out === null ? null : withoutPart(one.leaving.at, out, one.named)
    if (dropped === null) {
      refusals.push(
        `${one.leaving.at} was to stop naming \`${one.address}\` among its parts and its ` +
          "`partSlugs` could not be read with that part in it"
      )
      continue
    }
    put(one.leaving, dropped)
    const into = readAt(one.joining)
    const added = into === null ? null : withPart(one.joining.at, into, one.address)
    if (added === null) {
      refusals.push(
        `${one.joining.at} holds where \`${one.address}\` arrives and states no \`partSlugs\` ` +
          "this could add to — state `partSlugs` there and ask again"
      )
      continue
    }
    put(one.joining, added)
  }
  return refusals.length > 0 ? { refusals } : { edits: [...found.values()] }
}

export function parentedOver(
  root: string,
  sides: readonly { readonly from: string; readonly to: string }[],
  moved: ReadonlyMap<string, string>,
  valueAt: (path: string) => Value | null
): Parented {
  const reading = readingIn(root)
  const placing: Placing = { reading, moved, root, valueAt }
  const under = kindsUnder(DOMAIN, reading, valueAt)
  const refusals: string[] = []
  const parentings: Parenting[] = []
  for (const one of sides) {
    const said = partedFor(placing, under, one.from, one.to)
    if (said === null) continue
    if ("refusals" in said) refusals.push(...said.refusals)
    else parentings.push(...said.parentings)
  }
  return refusals.length > 0 ? { refusals } : { parentings, unread: null }
}

export function parentingOver(
  root: string,
  sides: readonly { readonly from: string; readonly to: string }[],
  moved: ReadonlyMap<string, string>,
  valueAt: (path: string) => Value | null
): Parented {
  try {
    return parentedOver(root, sides, moved, valueAt)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { parentings: [], unread: `${why}, so no page's parts were changed` }
  }
}

export function parentingSaid(held: readonly Parenting[], dry: boolean): readonly string[] {
  if (held.length === 0) return ["no page carried here changed the page holding it"]
  const said = [
    `${counted(held.length, "page")} ${dry ? "would change" : "changed"} the page holding ` +
      `${held.length === 1 ? "it" : "them"}`,
  ]
  for (const one of held) {
    said.push(
      `  \`${one.address}\` ${dry ? "would leave" : "left"} the parts of ${one.leaving.at} and ` +
        `${dry ? "join" : "joined"} the parts of ${one.joining.at}`
    )
  }
  said.push(PARENT_SPELLING)
  return said
}
