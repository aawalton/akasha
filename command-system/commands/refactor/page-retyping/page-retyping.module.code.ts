import { basename, dirname, join } from "node:path"
import { listedAt, namersOf, readingIn } from "@akasha/indexes"
import { knownIn } from "@akasha/indexes/reaching"
import type { Reading as Filed } from "@akasha/indexes/shape"
import { addressIn } from "@akasha/pages/page-address"
import { besideOf } from "@akasha/pages/page-beside"
import { typedAs } from "@akasha/pages/page-export-name"
import type { Carried } from "@akasha/pages/page-type-properties"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import { valuesOver } from "@akasha/pages/page-value"
import type { Asked as Asking } from "../../../asking/asking.module.code.ts"
import { counted, landingAsked } from "../../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../../calling/calling.module.code.ts"
import { answering } from "../../../calling/calling.module.code.ts"
import type { FileEdit } from "../../../landing/landing.module.code.ts"
import { baseOf } from "../../../landing/landing.module.code.ts"
import type { Carry as Reading } from "../../../reading/reading.module.code.ts"
import { carryReadings } from "../../../reading/reading.module.code.ts"
import { outsideIn, saidFrom } from "../../move/outside/move-outside.module.code.ts"
import { glassIn, messageIn } from "../../write/write.command.code.ts"
import { bodyTextOf, were } from "../landing/refactor-landing.module.code.ts"
import type {
  Carry,
  Retyping,
  Rewriting,
  Spelling,
} from "../retype-writing/retype-writing.module.code.ts"
import {
  carriedIn,
  manifested,
  namingOver,
  repointedOver,
} from "../retype-writing/retype-writing.module.code.ts"
import { addressedIn } from "../type-respelling/type-respelling.module.code.ts"

const PAGE_TYPE = "page-type"

const MANIFEST = "package.json"

const NAME = "name"

const EXPORTS = "exports"

const HERE = "."

const TS = ".ts"

export type Asked = { readonly retyping: Retyping } | { readonly refused: string }

export type Reached = { readonly said: string } | { readonly refused: string }

export type Held = {
  readonly at: string
  readonly folder: string
  readonly text: string
}

function keyedBy(carried: readonly Carried[]): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const one of carried) {
    if (!found.has(one.key)) found.set(one.key, one)
  }
  return found
}

export function unnamedIn(
  value: Value,
  was: string,
  now: string,
  given: string | Filed,
  pageOf: (path: string) => Value | null
): string | null {
  const there = propertiesIfNamedOf(now, given, pageOf)
  if (there === null) return `\`${now}\` names a page type whose properties could not be read`
  const wanted = keyedBy(there)
  const held = keyedBy(propertiesIfNamedOf(was, given, pageOf) ?? [])
  for (const key of Object.keys(value)) {
    if (wanted.has(key)) continue
    const said = `the page states \`${key}\`, and \`${now}\` reads no property by that key`
    const mine = held.get(key)
    if (mine === undefined) return said
    return `${said} — \`${was}\` reads \`${mine.pagePropertySlug}\` by it`
  }
  return null
}

export function retypingFor(
  given: string | Filed,
  named: string,
  now: string,
  pageOf: (path: string) => Value | null
): Asked {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    return {
      refused:
        `\`${named}\` names no page type — one slug is carried under many page types, so a ` +
        "retype takes the page type and the slug parted by `/`",
    }
  }
  const was = address.pageTypeSlug
  const slug = address.slug
  if (was === now) {
    return { refused: `\`${named}\` is already a \`${now}\`, so there is nothing to retype` }
  }
  const listed = listedAt(given, was, slug)
  const one = listed[0]
  if (one === undefined) return { refused: `no \`${was}\` carries the slug \`${slug}\`` }
  if (listed.length > 1) {
    return {
      refused: `${listed.length} pages carry \`${named}\`, so which one to retype is unanswered`,
    }
  }
  const filed = listedAt(given, PAGE_TYPE, now)
  const type = filed[0]
  if (type === undefined) return { refused: `no page type carries the slug \`${now}\`` }
  if (filed.length > 1) return { refused: `${filed.length} page types carry the slug \`${now}\`` }
  const value = pageOf(one.path)
  if (value === null) {
    return { refused: `${one.path} carries \`${named}\` and its body could not be read` }
  }
  const why = unnamedIn(value, was, now, given, pageOf)
  if (why !== null) return { refused: why }
  return {
    retyping: {
      id: one.id,
      path: one.path,
      slug,
      was,
      now,
      typePath: type.path,
      typeName: typedAs(now),
    },
  }
}

export function carriesFor(root: string, one: Retyping): readonly Carry[] {
  const dir = dirname(one.path)
  const was = `${one.slug}.${one.was}`
  const now = `${one.slug}.${one.now}`
  const found: Carry[] = [{ from: one.path, to: join(dir, `${now}${TS}`) }]
  for (const path of besideOf(root, one.path)) {
    const name = basename(path)
    found.push({ from: path, to: join(dir, `${now}${name.slice(was.length)}`) })
  }
  return found
}

export function readdressed(named: string, was: string, now: string): string | null {
  const address = addressIn(named)
  if (address.kind !== "qualified" || address.pageTypeSlug !== was) return null
  return `${now}/${address.slug}`
}

export function spellingOver(
  root: string,
  one: Retyping,
  pageOf: (path: string) => Value | null
): Spelling {
  const known = knownIn(readingIn(root), pageOf)
  const found = new Map<string, { said: Map<string, string>; keys: Set<string> }>()
  for (const path of new Set(namersOf(root, one.id).map((named) => named.path))) {
    const value = pageOf(path)
    if (value === null) continue
    for (const held of addressedIn(value, known, one.id)) {
      const next = readdressed(held.named, one.was, one.now)
      if (next === null) continue
      const at = found.get(path) ?? { said: new Map(), keys: new Set() }
      at.said.set(held.named, next)
      at.keys.add(held.key)
      found.set(path, at)
    }
  }
  return found
}

function manifestAbove(path: string, textOf: (at: string) => string | null): Held | null {
  let dir: string | null = dirname(path)
  while (dir !== null) {
    const at = join(dir, MANIFEST)
    const text = textOf(at)
    if (text !== null) return { at, folder: dir, text }
    dir = dir === HERE ? null : dirname(dir)
  }
  return null
}

function namedFrom(name: string, key: string): string {
  return key === HERE ? name : `${name}${key.slice(1)}`
}

export function exportedFrom(held: Held, to: string): Reached {
  const unanswered = `${held.at} exports no path naming ${to}, so how to import it is unanswered`
  let read: unknown
  try {
    read = JSON.parse(held.text)
  } catch {
    return { refused: `${held.at} is no readable JSON, so how to import ${to} is unanswered` }
  }
  if (read === null || typeof read !== "object") return { refused: unanswered }
  const value = read as Record<string, unknown>
  const name = value[NAME]
  if (typeof name !== "string") {
    return { refused: `${held.at} calls its package nothing, so how to import ${to} is unanswered` }
  }
  const said = value[EXPORTS]
  if (typeof said === "string") {
    return join(held.folder, said) === to ? { said: name } : { refused: unanswered }
  }
  if (said === null || typeof said !== "object") return { refused: unanswered }
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    if (typeof one === "string" && join(held.folder, one) === to) {
      return { said: namedFrom(name, key) }
    }
  }
  return { refused: unanswered }
}

export function specifierFor(
  from: string,
  to: string,
  textOf: (at: string) => string | null
): Reached {
  const there = manifestAbove(to, textOf)
  if (there === null) {
    return { refused: `${to} is under no ${MANIFEST}, so how to import it is unanswered` }
  }
  const here = manifestAbove(from, textOf)
  if (here !== null && here.at === there.at) return { said: saidFrom(dirname(from), to) }
  return exportedFrom(there, to)
}

export function retypeSaying(
  one: Retyping,
  carries: readonly Carry[],
  repointing: readonly string[],
  dry: boolean
): readonly string[] {
  return [
    `\`${one.was}/${one.slug}\` ${dry ? "would become" : "became"} \`${one.now}/${one.slug}\``,
    `${one.path} says which page type it is, and ${one.typePath} carries \`${one.now}\``,
    ...(dry ? carries.map((held) => `  ${held.from} -> ${held.to}`) : []),
    `${counted(carries.length, "file")} ${were(carries.length, dry)} carried`,
    repointing.length === 0
      ? "no file naming it needed repointing"
      : `${counted(repointing.length, "file")} naming it ${were(repointing.length, dry)} repointed`,
    ...(dry ? repointing.map((path) => `  ${path}`) : []),
  ]
}

export async function retypeLanded(
  given: Given,
  root: string,
  from: string,
  to: string,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Promise<Answer> {
  const base = baseOf(root)
  const bodyText = bodyTextOf(root, base)
  const pageOf = valuesOver(bodyText)
  const asked = retypingFor(root, from, to, pageOf)
  if ("refused" in asked) return answering([], [asked.refused], 1)
  const one = asked.retyping
  const specifier = specifierFor(one.path, one.typePath, bodyText)
  if ("refused" in specifier) return answering([], [specifier.refused], 1)
  const carries = carriesFor(root, one)
  const moved = new Map<string, string>(carries.map((held) => [held.from, held.to]))
  const held: Rewriting = {
    one,
    moved,
    spelling: spellingOver(root, one, pageOf),
    specifier: specifier.said,
  }
  const carried = carriedIn(root, base, held, carries)
  if ("refused" in carried) return answering([], [carried.refused], 2)
  const naming = namingOver(root, base, moved, held.spelling)
  if ("unread" in naming) return answering([], [naming.unread], 2)
  const repointing = repointedOver(root, base, held, naming.paths)
  if ("refused" in repointing) return answering([], [repointing.refused], 2)
  const manifests = manifested(root, base, moved, bodyText)
  const changes: FileEdit[] = [...carried.changes, ...repointing.changes, ...manifests.changes]
  const readings: Reading[] = [...carried.readings, ...repointing.readings, ...manifests.readings]
  const outside = outsideIn(root, base, moved, new Set(changes.map((each) => each.path)))
  if ("refusal" in outside) return answering([], [outside.refusal], 1)
  changes.push(...outside.changes)
  readings.push(...outside.carries)
  const glass = glassIn(argv, flags)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const message = messageIn(argv, flags)
  if ("refusals" in message) return answering([], message.refusals, 1)
  const named = [...repointing.repointed, ...manifests.repointed, ...outside.paths].sort()
  const asking: Asking = {
    changes,
    message: message.message ?? `retype \`${from}\` as a \`${to}\``,
    dryRun,
    glass: glass.glass,
    unmoved: [],
    read: base,
    carries: carried.moving,
    saying: () => retypeSaying(one, carries, named, false),
  }
  const landing = await landingAsked({ ...given, root }, asking)
  if (!dryRun) {
    if (landing.code === 0) carryReadings(root, readings)
    return landing
  }
  return answering(
    [...retypeSaying(one, carries, named, true), ...landing.report],
    landing.refusals,
    landing.code
  )
}
