import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  answeringIn,
  bodyAt,
  callsFor,
  type Entry,
  entriesIn,
  lineOf,
} from "akasha/infrastructure/machine/host/modules/hosts-entering/hosts-entering.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  type Held,
  indexedRepo,
  type Named,
  pageOf,
  scratch as worldScratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

afterAll(worldScratch.sweep)

const TREE = "akasha"

const A_HOST = "host"

const HELD = "one"

const NAME = "headscale.alanwalton.com"

const ADDRESS = "192.168.68.240"

const LOOPBACK = "127.0.0.1 localhost"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const idOf = (one: string): string => `01a0c980-0000-7000-8000-00000000000${one}`

const VOCABULARY: readonly Named[] = [
  aType(idOf("1"), A_HOST, [DOMAIN_AT], ["title", "host-address"]),
  aProperty(idOf("2"), "title", "text-property"),
  aProperty(idOf("3"), "host-address", "text-property", { propertySlug: "address" }),
  aType(idOf("4"), "text-property", [PAGE_PROPERTY_AT]),
]

const ENTRY: Entry = { page: "held/one.host.ts", name: NAME, address: ADDRESS }

function worldStating(rest: Held): string {
  const held: Record<string, string> = Object.fromEntries(
    VOCABULARY.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])
  )
  const stated = { id: idOf("5"), pageTypeSlug: A_HOST, slug: HELD, definition: "a thing", ...rest }
  held[`${TREE}/${HELD}/${HELD}.${A_HOST}.ts`] = pageOf(stated)
  return indexedRepo(held)
}

function outside(): string {
  return scratch.rootFor("akasha-hosts-entering-")
}

test("a host page stating an address wants that address answered for that host's title", () => {
  const root = worldStating({ title: NAME, address: ADDRESS })

  expect(entriesIn(root).map(lineOf)).toEqual([`${ADDRESS} ${NAME}`])
})

test("a host page stating no address wants no line", () => {
  const root = worldStating({ title: NAME })

  expect(entriesIn(root)).toEqual([])
})

test("a repository with no index wants no line", () => {
  expect(entriesIn(outside())).toEqual([])
})

test("a name a line already answers is read off that line", () => {
  expect(answeringIn(`${LOOPBACK}\n${ADDRESS} ${NAME}\n`, NAME)).toBe(ADDRESS)
})

test("a name is weighed against a line's names without regard to case", () => {
  expect(answeringIn(`${ADDRESS} HEADSCALE.ALANWALTON.COM\n`, NAME)).toBe(ADDRESS)
})

test("what follows a hash on a line is no name", () => {
  expect(answeringIn(`${LOOPBACK} # ${NAME}\n`, NAME)).toBeNull()
})

test("a name no line answers is answered nowhere", () => {
  expect(answeringIn(`${LOOPBACK}\n`, NAME)).toBeNull()
})

test("the line is handed to the shell as an argument rather than spelled into the script", () => {
  const calls = callsFor(ENTRY)

  expect(calls).toHaveLength(1)
  expect(calls[0]?.at(-1)).toBe(`${ADDRESS} ${NAME}`)
  expect(calls[0]?.[2] ?? "").not.toContain(NAME)
})

test("a line is appended, and no line already there is rewritten", () => {
  const at = join(outside(), "hosts")
  writeFileSync(at, `${LOOPBACK}\n`)

  for (const argv of callsFor(ENTRY, at)) ran([...argv])

  expect(bodyAt(at)).toBe(`${LOOPBACK}\n${ADDRESS} ${NAME}\n`)
})

test("a hosts file that is not there reads as nothing", () => {
  expect(bodyAt(join(outside(), "gone"))).toBe("")
})
