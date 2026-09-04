import { expect, test } from "bun:test"
import type { Asked, Query, Row } from "@akasha/pages-system-service/asking"
import {
  type FilePageTypeConfigDeps,
  fileMediaPageTypeSlugs,
  MEDIA_CONFIG_KEY,
  nearestConfigValue,
  SEQUENCE_CONFIG_KEY,
  type StatedConfig,
  statedConfigValue,
} from "./file-page-type-config.module.code.ts"

type Store = Readonly<Record<string, Row>>

type Fake = {
  readonly deps: FilePageTypeConfigDeps
  readonly asked: readonly string[]
}

function fakeOver(store: Store): Fake {
  const asked: string[] = []
  const deps: FilePageTypeConfigDeps = {
    ask: (query: Query): Promise<Asked> => {
      const named = query.where?.slug?.is
      if (named === undefined) return Promise.resolve({ rows: Object.values(store) })
      asked.push(named)
      const row = store[named]
      return Promise.resolve({ rows: row === undefined ? [] : [row] })
    },
  }
  return { deps, asked }
}

function typed(slug: string, above: unknown, said: unknown): Row {
  const row: Record<string, unknown> = { slug }
  if (above !== null) row.extendsSlug = above
  if (said !== null) row[SEQUENCE_CONFIG_KEY] = said
  return row
}

function answered(stated: StatedConfig): { readonly stands: boolean; readonly value: unknown } {
  if (!stated.asked) throw new Error(`the fake store refused: ${stated.why}`)
  return { stands: stated.stands, value: stated.value }
}

function aboveIn(stated: StatedConfig): readonly string[] {
  if (!stated.asked) throw new Error(`the fake store refused: ${stated.why}`)
  return stated.extendsSlugs
}

test("a parent named as a one-item list is read as the same parent a bare string names", async () => {
  const listed = fakeOver({
    leaf: typed("leaf", ["page-type/root"], null),
    root: typed("root", null, { said: "root" }),
  })
  const bare = fakeOver({
    leaf: typed("leaf", ["page-type/root"], null),
    root: typed("root", null, { said: "root" }),
  })
  const overList = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, listed.deps)
  const overString = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, bare.deps)
  expect(answered(overList).value).toEqual({ said: "root" })
  expect(answered(overString).value).toEqual({ said: "root" })
  expect(listed.asked).toEqual(bare.asked)
})

test("the parents a page type names are answered as a list whether one or many are named", async () => {
  const fake = fakeOver({
    one: typed("one", ["page-type/up"], null),
    two: typed("two", ["page-type/up", "over"], null),
    none: typed("none", null, null),
  })
  expect(aboveIn(await statedConfigValue("one", SEQUENCE_CONFIG_KEY, fake.deps))).toEqual(["up"])
  expect(aboveIn(await statedConfigValue("two", SEQUENCE_CONFIG_KEY, fake.deps))).toEqual([
    "up",
    "over",
  ])
  expect(aboveIn(await statedConfigValue("none", SEQUENCE_CONFIG_KEY, fake.deps))).toEqual([])
})

test("of two parents the nearer states the key, and the deeper ancestor is never asked", async () => {
  const fake = fakeOver({
    leaf: typed("leaf", ["one", "two"], null),
    one: typed("one", null, { said: "one" }),
    two: typed("two", ["far"], null),
    far: typed("far", null, { said: "far" }),
  })
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated).value).toEqual({ said: "one" })
  expect(fake.asked).toEqual(["leaf", "two", "one"])
})

test("where two parents are equally near and both state the key, the last named wins", async () => {
  const fake = fakeOver({
    leaf: typed("leaf", ["one", "two"], null),
    one: typed("one", null, { said: "one" }),
    two: typed("two", null, { said: "two" }),
  })
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated).value).toEqual({ said: "two" })
  expect(fake.asked).toEqual(["leaf", "two"])
})

test("where two grandparents are equally near, the last named of the last named wins", async () => {
  const fake = fakeOver({
    leaf: typed("leaf", ["one", "two"], null),
    one: typed("one", ["a", "b"], null),
    two: typed("two", ["c", "d"], null),
    a: typed("a", null, { said: "a" }),
    b: typed("b", null, { said: "b" }),
    c: typed("c", null, { said: "c" }),
    d: typed("d", null, { said: "d" }),
  })
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated).value).toEqual({ said: "d" })
  expect(fake.asked).toEqual(["leaf", "two", "one", "d"])
})

test("a ring of page types is walked once round and answered as stating nothing", async () => {
  const fake = fakeOver({
    a: typed("a", ["b"], null),
    b: typed("b", ["c"], null),
    c: typed("c", ["a"], null),
  })
  const stated = await nearestConfigValue("a", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated)).toEqual({ stands: false, value: null })
  expect(fake.asked).toEqual(["a", "b", "c"])
})

test("a ring one member of which states the key is answered from that member", async () => {
  const fake = fakeOver({
    a: typed("a", ["b"], null),
    b: typed("b", ["c"], null),
    c: typed("c", ["a"], { said: "c" }),
  })
  const stated = await nearestConfigValue("a", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated).value).toEqual({ said: "c" })
  expect(fake.asked).toEqual(["a", "b", "c"])
})

test("a page type whose parents state nothing is answered as stating nothing", async () => {
  const fake = fakeOver({
    leaf: typed("leaf", ["one", "two"], null),
    one: typed("one", null, null),
    two: typed("two", null, null),
  })
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated)).toEqual({ stands: false, value: null })
  expect(fake.asked).toEqual(["leaf", "two", "one"])
})

test("a parent naming no page type here stops that branch rather than the whole search", async () => {
  const fake = fakeOver({
    leaf: typed("leaf", ["two", "gone"], null),
    two: typed("two", null, { said: "two" }),
  })
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated).value).toEqual({ said: "two" })
  expect(fake.asked).toEqual(["leaf", "gone", "two"])
})

test("a refusal from the pages is carried back rather than read as stating nothing", async () => {
  const deps: FilePageTypeConfigDeps = { ask: () => Promise.resolve({ refused: "no index" }) }
  const stated = await nearestConfigValue("leaf", SEQUENCE_CONFIG_KEY, deps)
  expect(stated.asked).toBe(false)
  expect(() => answered(stated)).toThrow("no index")
})

test("no more than twenty page types are asked, however far the search reaches", async () => {
  const store: Record<string, Row> = {}
  for (let step = 0; step < 40; step += 1) {
    const said = step === 30 ? { said: "deep" } : null
    store[`up${step}`] = typed(`up${step}`, step === 39 ? null : [`up${step + 1}`], said)
  }
  const fake = fakeOver(store)
  const stated = await nearestConfigValue("up0", SEQUENCE_CONFIG_KEY, fake.deps)
  expect(answered(stated)).toEqual({ stands: false, value: null })
  expect(fake.asked.length).toBe(20)
})

test("a page type reaches a media config through either of the parents it names", async () => {
  const fake = fakeOver({
    plain: { slug: "plain" },
    shown: { slug: "shown", [MEDIA_CONFIG_KEY]: { renderer: "image" } },
    leaf: { slug: "leaf", extendsSlug: ["plain", "shown"] },
    only: { slug: "only", extendsSlug: ["plain"] },
  })
  const kin = await fileMediaPageTypeSlugs(fake.deps)
  expect([...kin].sort()).toEqual(["leaf", "shown"])
})
