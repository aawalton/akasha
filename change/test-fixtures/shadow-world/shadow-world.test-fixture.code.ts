import { expect } from "bun:test"
import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { changeFileContent } from "akasha/change/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  type BodyOf,
  refusing,
  replayed,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  NOTHING_OVER,
  type Reached,
  type Reaching,
  reach,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running as runningChange } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import type { Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  listedAndValued,
  nothingFiled,
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import {
  indexedRepo,
  put,
  scratch,
  textIn,
  bodyOf as valueBody,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const MODULES = "node_modules"

const CONFIG = "biome.json"

const CHANGE_IMPORTS = `${changeMechanicalFileContent.slug}/${changeFileContent.slug}` as const

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

const PROPERTY_VALUE: Value = {
  id: TYPES_ID,
  pageTypeSlug: FILE_PROPERTY,
  slug: "types",
  propertySlug: "types",
  generated: true,
}

function propertyFiled(root: string): undefined {
  shapeAdded(root, FILE_PROPERTY, "types", [
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
  valueAlsoFiled(root, FILE_PROPERTY, [{ path: PROPERTY_AT, value: PROPERTY_VALUE }])
  idFiled(root, TYPES_ID, [{ path: PROPERTY_AT, id: TYPES_ID }])
  relationFiled(root, TYPES_ID, "page-property", THING_ID, [{ path: PAGE_TYPE_AT }])
  put(root, PROPERTY_AT, valueBody(PROPERTY_VALUE))
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

export type Adding = {
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
  rowFieldOfKey: () => null,
  entriedIn: () => [],
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

export function bodyAfter(said: Answer, world: World, at: string): string {
  return bodiesIn(said, world.base).get(at) ?? ""
}

export function bodyAnswered(said: Answer, world: World, at: string): string {
  expect(said.refused).toBe(null)
  return bodyAfter(said, world, at)
}

export function refusalOf(said: Answer, textOf: BodyOf = () => null): string {
  if (said.refused !== null) return said.refused
  const held = replayed(said, textOf)
  return "refused" in held ? held.refused : ""
}

export function filesOf(held: Readonly<Record<string, string>>): (path: string) => string | null {
  return (path) => held[path] ?? null
}

export function bodyAt(at: string, body: string): (path: string) => string | null {
  return (path) => (path === at ? body : null)
}

const NOWHERE = "/nowhere"

const NO_SHAPES: ReadonlySet<string> = new Set()

const UNDER = "/"

function namedIn(held: Readonly<Record<string, string>>): (path: string) => boolean {
  const made = new Set<string>()
  for (const path of Object.keys(held)) {
    made.add(path)
    for (let at = path.indexOf(UNDER); at >= 0; at = path.indexOf(UNDER, at + 1)) {
      made.add(path.slice(0, at))
    }
  }
  return (path) => made.has(path)
}

export function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: NOWHERE,
    index: {
      everyPath: () => Object.keys(held),
      entryShapesAt: () => NO_SHAPES,
      importersOf: () => [],
    } as never,
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    names: namedIn(held),
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

export function declaring(key: string, required: boolean): Declared {
  return {
    pagePropertySlug: `text-property/${key}`,
    pageTypeSlug: "text-property",
    propertySlug: key,
    key,
    unique: null,
    declaredBy: "module",
    required,
    many: false,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
  }
}

export function worldKnowing(
  held: Readonly<Record<string, string>>,
  carried: readonly Declared[] | null
): World {
  return { ...worldOf(held), index: { propertiesIfNamed: () => carried } as never }
}

export type Carried = { at: string; given: unknown }

export function worldRecording(carried: Carried, answers: Answer = NOTHING_OVER): World {
  return {
    root: NOWHERE,
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(answers)
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
    root: NOWHERE,
    index: { knownIn: () => known, pageByPath: () => page, valuesByPath: () => valued } as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
    over: NOTHING_OVER,
    reaching,
  }
}

export function worldOfType(
  kind: string,
  bodies: Readonly<Record<string, string>>,
  carried: readonly Declared[] | null,
  values: ReadonlyMap<string, Value>,
  reaching: Reaching,
  shapes: ReadonlyMap<string, Shape> = new Map<string, Shape>()
): World {
  const index = {
    kindsUnder: () => new Set([kind]),
    pageTypesIn: () => new Set([kind]),
    propertiesIfNamed: () => carried,
    shapesAt: () => shapes,
    valuesByPath: () => values,
  } as never
  const ledger = ledgerAt(NOWHERE, filesOf(bodies), reaching)
  return Object.defineProperty(ledger, "index", { value: index })
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

export function repoWorld(bodies: Readonly<Record<string, string>> = {}): World {
  const root = indexedRepo(bodies)
  return worldAt(root, textIn(root))
}

export function worldIn(root: string, address: string): World {
  return worldAt(root, textIn(root), running(address))
}

function taking(address: string): Reaching {
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

export const AT = "akasha/one/fresh.module.code.ts"

export const OTHER = "akasha/one/other.module.code.ts"

export const ADD_FILE = `${changeMechanicalFile.slug}/${addFile.slug}` as const

export const REMOVE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

export const AROUND = `${changeMechanicalFile.slug}/add-file-around` as const

export const NO_BODY = `\`${AT}\` holds no body, so nothing is taken away`

export const WRITING: Reaching = runningChange

export const nesting: Reaching = async (world, at, given) => {
  if (at !== AROUND) return await WRITING(world, at, given)
  return (await reach(world, ADD_FILE as never, given)).said
}

function typedBody(keys: string): string {
  return `export const fresh = {\n  id: "held",\n${keys}  slug: "fresh",\n} as const\n`
}

export const BOTH_KEYS = typedBody(`  pageTypeSlug: "module",\n  type: "module",\n`)

export const TYPE_ONLY = typedBody(`  type: "module",\n`)

export const SECOND_TYPE = typedBody(`  type: "command",\n`)

export const SLUG_ONLY = BOTH_KEYS.replace(`  type: "module",\n`, "")

export const SLUG_UNDER_TYPE = typedBody(`  pageTypeSlug: "command",\n  type: "module",\n`)

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
