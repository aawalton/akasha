import { expect } from "bun:test"
import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratch, textIn } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import type { Shaped } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import {
  idFiled,
  listedAndValued,
  listedFiled,
  nothingFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Value } from "akasha/pages/value/page-value.module.code.ts"
import { rootOf } from "../../../commands/modules/rooting/rooting.module.code.ts"
import { type BodyOf, refusing, replayed, stating } from "../answer/change-answer.module.code.ts"
import type { Answer } from "../answer/change-answer.module.types.ts"
import {
  ledgerAt,
  NOTHING_OVER,
  type Reached,
  type Reaching,
  reach,
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

const TYPES_ID = "01a058c0-0000-7000-8000-000000000009"

const THING_ID = "01a058c0-0000-7000-8000-000000000002"

const ONE_ID = "01a058c0-0000-7000-8000-000000000005"

const PAGE_TYPE_AT = "akasha/thing.page-type.ts"

const PAGE_AT = "akasha/one.thing.ts"

const FILE_PROPERTY = "file-property"

function propertyFiled(root: string): undefined {
  schemaFiled(root, FILE_PROPERTY, "types", [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: "types",
      propertySlug: "types",
      fileName: null,
    },
  ])
  listedFiled(root, FILE_PROPERTY, "types", [{ path: PROPERTY_AT, id: TYPES_ID }])
  valueAlsoFiled(root, FILE_PROPERTY, [
    {
      path: PROPERTY_AT,
      value: {
        id: TYPES_ID,
        pageTypeSlug: FILE_PROPERTY,
        slug: "types",
        propertySlug: "types",
        generated: true,
      },
    },
  ])
  idFiled(root, TYPES_ID, [{ path: PROPERTY_AT, id: TYPES_ID }])
  relationFiled(root, TYPES_ID, "page-property", THING_ID, [{ path: PAGE_TYPE_AT }])
}

function rootThatFormats(): string {
  const root = scratch.rootFor("change-shadow-generated-")
  symlinkSync(join(rootOf(import.meta.dir), MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), FORMATS)
  nothingFiled(root)
  listedAndValued(root, "page-type", "thing", PAGE_TYPE_AT, THING_ID)
  idFiled(root, THING_ID, [{ path: PAGE_TYPE_AT, id: THING_ID }])
  listedAndValued(root, "thing", "one", PAGE_AT, ONE_ID)
  propertyFiled(root)
  return root
}

function repointingTo(path: string, now: string): Reaching {
  return (_world, at) => {
    if (at === CHANGE_IMPORTS) {
      return Promise.resolve(stating([{ kind: "replace", path, contentFrom: WAS, contentTo: now }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

async function reachingOver(path: string, now: string): Promise<Reached> {
  const held: Record<string, string> = { [path]: WAS }
  const ledger = ledgerAt(rootThatFormats(), (one) => held[one] ?? null, repointingTo(path, now))
  return await reach(ledger, CHANGE_IMPORTS as never, {})
}

export async function withheldExactly(now: string, want: string): Promise<undefined> {
  const said = await reachingOver(GENERATED_AT, now)
  expect(said.said.refused).toBeNull()
  expect(said.world.textOf(GENERATED_AT)).toBe(want)
}

export async function answeredOf(now: string, at: string): Promise<number> {
  const said = await reachingOver(at, now)
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

export type Carried = { at: string; given: unknown }

export function worldRecording(carried: Carried): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

export function worldFor(
  page: Value,
  body: string,
  reaching: Reaching,
  valued: ReadonlyMap<string, Value> = new Map<string, Value>()
): World {
  const known = knownOf({ admitting: (one) => [one] })
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => page, valuesByPath: () => valued } as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
    over: NOTHING_OVER,
    reaching,
  }
}

export type Caught = { readonly at: string; readonly given: Record<string, unknown> }

export function catching(seen: Caught[]): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    return Promise.resolve(stating([]))
  }
}

export function refusingAt(seen: Caught[], address: string): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    if (at === address) return Promise.resolve(refusing(`\`${at}\` would not`))
    return Promise.resolve(stating([]))
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

export const FRESH_PAGE = "akasha/one/fresh.module.ts"

export const FRESH_BODY = `export const fresh = ${JSON.stringify(
  {
    id: "01a07c9a-0001-7000-8000-000000000001",
    pageTypeSlug: "module",
    slug: "fresh",
    definition: "a page an edit added",
    code: "ts",
  },
  null,
  2
)} as const\n`
