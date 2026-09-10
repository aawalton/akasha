import { expect } from "bun:test"
import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratch, textIn } from "@akasha/indexes/indexing/testing"
import type { Facing } from "@akasha/indexes/property-carrying"
import type { Shaped } from "@akasha/indexes/reaching"
import type { Value } from "@akasha/pages/page-value"
import { rootOf } from "../../../commands/modules/rooting/rooting.module.code.ts"
import { type BodyOf, refusing, replayed, stating } from "../answer/change-answer.module.code.ts"
import type { Answer } from "../answer/change-answer.module.types.ts"
import {
  ledgerAt,
  NOTHING_OVER,
  type Reached,
  type Reaching,
  seeding,
  type World,
  worldAt,
} from "./change-shadow.module.code.ts"

const MODULES = "node_modules"

const CONFIG = "biome.json"

const CHANGE_IMPORTS = "change-mechanical-file-content/change-imports"

const PROPERTY_AT = "akasha/types.file-property.ts"

export const GENERATED_AT = "akasha/one.thing.types.ts"

export const AUTHORED_AT = "akasha/two.thing.ts"

const WAS = `import type { B } from "./b.text-property.ts"
import type { Held } from "./m/held.text-property.ts"

export type One = { b: B; held: Held }
`

export const LOOSE = `import type { B } from "./b.text-property.ts"
import type { Held } from "./a/held.text-property.ts"

export type One = { b: B; held: Held }
`

export const REORDERED = `import type { Held } from "./a/held.text-property.ts"
import type { B } from "./b.text-property.ts"

export type One = { b: B; held: Held }
`

export const IN_ORDER = `import type { B } from "./b.text-property.ts"
import type { Held } from "./n/held.text-property.ts"

export type One = { b: B; held: Held }
`

const FORMATS = JSON.stringify({
  formatter: { indentStyle: "space", indentWidth: 2, lineWidth: 100 },
  assist: { actions: { source: { organizeImports: "on" } } },
  javascript: { formatter: { quoteStyle: "double", semicolons: "asNeeded" } },
})

function rootThatFormats(): string {
  const root = scratch.rootFor("change-shadow-seeding-")
  symlinkSync(join(rootOf(import.meta.dir), MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), FORMATS)
  return root
}

const FACE: Facing = {
  kindsUnder: () => ["file-property"],
  everyOfType: () => [{ path: PROPERTY_AT }],
  valueAt: (path) =>
    path === PROPERTY_AT ? { generated: true, propertySlug: "types", slug: "types" } : null,
  carryingOf: () => ({
    carrying: [{ pageTypeSlug: "thing", path: "akasha/one.thing.ts", id: "one", within: null }],
  }),
}

function repointingTo(path: string, now: string): Reaching {
  return (_world, at) => {
    if (at === CHANGE_IMPORTS) {
      return Promise.resolve(stating([{ kind: "replace", path, contentFrom: WAS, contentTo: now }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

async function seedingOver(path: string, now: string): Promise<Reached> {
  const held: Record<string, string> = { [path]: WAS }
  const ledger = ledgerAt(rootThatFormats(), (one) => held[one] ?? null, repointingTo(path, now))
  return await seeding(ledger, FACE, CHANGE_IMPORTS as never, {})
}

export async function seedsExactly(now: string, want: string): Promise<undefined> {
  const said = await seedingOver(GENERATED_AT, now)
  expect(said.said.refused).toBeNull()
  expect(said.world.textOf(GENERATED_AT)).toBe(want)
}

export async function answeredOf(now: string, at: string): Promise<number> {
  const said = await seedingOver(at, now)
  expect(said.said.refused).toBeNull()
  return said.said.edits.length
}

type Adding = {
  readonly at: string
  readonly body: string
}

const KNOWS_NOTHING: Shaped = {
  targetOf: () => null,
  admitting: () => [],
  mortal: () => false,
  scoping: () => null,
  filed: () => [],
  fieldsOf: () => [],
  slugOfKeyIn: () => null,
  fieldOfKey: () => null,
}

export function knownOf(said: Partial<Shaped>): Shaped {
  return { ...KNOWS_NOTHING, ...said }
}

export function bodyOf(said: Answer, textOf: BodyOf = () => null): string {
  expect(said.refused).toBe(null)
  const held = replayed(said, textOf)
  expect(held).not.toHaveProperty("refused")
  if ("refused" in held) return ""
  const left = [...held.values()].filter((one): one is string => typeof one === "string")
  expect(left).toHaveLength(1)
  return left[0] ?? ""
}

export function refusalOf(said: Answer, textOf: BodyOf = () => null): string {
  if (said.refused !== null) return said.refused
  const held = replayed(said, textOf)
  return "refused" in held ? held.refused : ""
}

export function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

export function worldFor(page: Value, body: string, reaching: Reaching): World {
  const known = knownOf({ admitting: (one) => [one] })
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => page } as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
    over: NOTHING_OVER,
    reaching,
  }
}

export function running(address: string): Reaching {
  return (_world, at, given) => {
    if (at === address) {
      const asked = given as Adding
      return Promise.resolve(stating([{ kind: "add", path: asked.at, content: asked.body }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

export function worldIn(root: string, address: string): World {
  return worldAt(root, textIn(root), running(address))
}

export function taking(address: string): Reaching {
  return (_world, at, given) => {
    if (at === address) {
      const asked = given as { readonly at: string }
      return Promise.resolve(stating([{ kind: "remove", path: asked.at }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

export function worldTaking(root: string, address: string): World {
  return worldAt(root, textIn(root), taking(address))
}
