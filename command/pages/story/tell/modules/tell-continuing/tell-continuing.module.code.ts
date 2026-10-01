import { dirname, join } from "node:path"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { title } from "akasha/page/properties/title.text-property.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import { loreFact } from "akasha/story/lore/properties/lore-fact.text-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { world } from "akasha/story/world/stories/played/properties/world.relation-property.ts"

export const ADD_FILE = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const HELD = "ts"

const QUALIFIED = "qualified"

const FIRST = 2

const CONTINUED = ", continued"

const TYPES = `akasha/story/${lore.slug}/${lore.slug}.page-type.types.ts`

const BYTES = new TextEncoder()

export type Told = { readonly fact: string; readonly knowers: readonly string[] }

export type Laid = {
  readonly asked: readonly Asking[]
  readonly laid: string
  readonly fresh: boolean
}

type Continuing = {
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly { readonly path: string }[]
  readonly valueAt: (path: string) => Value | null
  readonly shaped: (path: string, text: string) => string
}

type Family = { readonly held: readonly string[]; readonly next: string }

export function fits(body: string): boolean {
  return BYTES.encode(body).length <= CEILING
}

export function factsSpelled(facts: readonly Told[]): string {
  const records = facts.map(
    (one) =>
      `{ ${loreFact.propertySlug}: ${JSON.stringify(one.fact)}, ${loreKnowers.propertySlug}: [${one.knowers.map((each) => JSON.stringify(each)).join(", ")}] }`
  )
  return `[${records.join(", ")}]`
}

function pathOf(look: Continuing, named: string): string | null {
  const address = addressIn(named)
  if (address.kind !== QUALIFIED) return null
  return look.listedAt(address.pageTypeSlug, address.slug)[0]?.path ?? null
}

function targetOf(named: string, value: Value | null): string {
  return (value === null ? null : textAt(value, loreAbout.propertySlug)) ?? named
}

function familyOf(look: Continuing, slug: string, target: string): Family {
  const held: string[] = []
  let count = FIRST
  let path = look.listedAt(lore.slug, `${slug}-${count}`)[0]?.path
  while (path !== undefined) {
    const value = look.valueAt(path)
    if (value !== null && textAt(value, loreAbout.propertySlug) === target) held.push(path)
    count += 1
    path = look.listedAt(lore.slug, `${slug}-${count}`)[0]?.path
  }
  return { held, next: `${slug}-${count}` }
}

type Opened = {
  readonly slug: string
  readonly titled: string
  readonly world: string
  readonly target: string
  readonly told: Told
}

export function continuationBody(opened: Opened): string {
  return [
    `import type { Lore } from "${TYPES}"`,
    "",
    `export const ${exportedAs(opened.slug)} = {`,
    `  type: "page-type/${lore.slug}",`,
    `  slug: ${JSON.stringify(opened.slug)},`,
    `  ${title.propertySlug}: ${JSON.stringify(opened.titled)},`,
    `  ${world.propertySlug}: ${JSON.stringify(opened.world)},`,
    `  ${loreAbout.propertySlug}: ${JSON.stringify(opened.target)},`,
    `  ${loreFacts.propertySlug}: ${factsSpelled([opened.told])},`,
    "} as const satisfies Lore",
    "",
  ].join("\n")
}

export function continued(
  named: string,
  told: Told,
  look: Continuing,
  tellingAt: (path: string) => Laid | string
): readonly Asking[] | string {
  const address = addressIn(named)
  const at = pathOf(look, named)
  if (address.kind !== QUALIFIED || at === null) return `\`${named}\` names no lore page here`
  const value = look.valueAt(at)
  const target = targetOf(named, value)
  const family = familyOf(look, address.slug, target)
  const newest = family.held.at(-1)
  if (newest !== undefined) {
    const there = tellingAt(newest)
    if (typeof there === "string") return there
    if (fits(there.laid)) return there.asked
  }
  const said = value === null ? null : textAt(value, world.propertySlug)
  const worldAt = said === null ? null : pathOf(look, said)
  if (said === null || worldAt === null) return `\`${at}\` names no world to continue its lore in`
  const titled = `${(value === null ? null : textAt(value, title.propertySlug)) ?? address.slug}${CONTINUED}`
  const path = join(dirname(worldAt), lore.pluralSlug, `${family.next}.${lore.slug}.${HELD}`)
  const opened = { slug: family.next, titled, world: said, target, told }
  return [{ at: ADD_FILE, given: { at: path, body: look.shaped(path, continuationBody(opened)) } }]
}
