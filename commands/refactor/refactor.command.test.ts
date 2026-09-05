import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { aProperty, aType, bodyOf, VOCABULARY } from "@akasha/indexes/indexing/testing"
import { rebuiltIn } from "@akasha/indexes/testing"
import { admitting } from "@akasha/testing-system/minting"
import { put, there } from "@akasha/testing-system/putting"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { refactor } from "./refactor.command.code.ts"

const GIVEN = {
  root: "/nowhere-at-all",
  calledAs: "akasha refactor",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("an act this does not carry is refused with the ones it does", async () => {
  const said = await refactor(["reshape", "page-type"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`reshape` is no act this carries")
  expect(said.refusals[0]).toContain("`rename`")
  expect(said.refusals[0]).toContain("`retype`")
})

test("a retype takes the address a page is at and the page type it becomes", async () => {
  const said = await refactor(["retype", "--from", "module/one"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("a retype takes --from and --to")
})

test("a retype takes no plural, no line and no respelling inside strings", async () => {
  const said = ["--from", "module/one", "--to", "manifest"]
  const plural = await refactor(["retype", ...said, "--plural", "n"], GIVEN)
  expect(plural.refusals[0]).toContain("--plural")
  const line = await refactor(["retype", ...said, "--line", "3"], GIVEN)
  expect(line.refusals[0]).toBe("only a name rename takes --line")
  const strings = await refactor(["retype", ...said, "--in-strings"], GIVEN)
  expect(strings.refusals[0]).toBe("only a name rename takes --in-strings")
})

test("naming no act is refused with what to say", async () => {
  const said = await refactor([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("rename page-type")
})

test("an act names the namespace it is worked over", async () => {
  const said = await refactor(["rename"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the namespace it is worked over")
})

test("a namespace this does not carry is refused with the ones it does", async () => {
  const said = await refactor(["rename", "seat"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seat` is not one of them")
  expect(said.refusals[0]).toContain("`page-type`")
  expect(said.refusals[0]).toContain("`property-slug`")
})

test("a key rename takes the property it is worked over and the key it becomes", async () => {
  const said = await refactor(["rename", "property-slug", "--from", "text-property/slug"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to")
})

test("a key rename takes no plural", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--plural", "n"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a key rename respells no string", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a page type rename respells no string", async () => {
  const said = await refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a key rename takes no line", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a page type rename takes no line", async () => {
  const said = await refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--plural", "chairs", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a name rename naming a line no body could carry is refused", async () => {
  const said = await refactor(
    [
      "rename",
      "token",
      "--at",
      "akasha/one.module.code.ts",
      "--from",
      "a",
      "--to",
      "b",
      "--line",
      "x",
    ],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--line takes the line a declaration starts on")
})

test("a rename takes the slug, what it becomes, and the plural it becomes", async () => {
  const said = await refactor(["rename", "page-type", "--from", "seat", "--to", "chair"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a page slug rename takes the address a page is at and the slug it becomes", async () => {
  const said = await refactor(["rename", "page-slug", "--from", "module/one"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to")
})

test("a page slug rename takes no plural", async () => {
  const said = await refactor(
    ["rename", "page-slug", "--from", "module/one", "--to", "two", "--plural", "n"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a slug alone names no page, and a page type is sent to the act renaming one", async () => {
  const bare = await refactor(["rename", "page-slug", "--from", "one", "--to", "two"], GIVEN)
  expect(bare.code).toBe(1)
  expect(bare.refusals[0]).toContain("names no page type")
  const typed = await refactor(
    ["rename", "page-slug", "--from", "page-type/seat", "--to", "two"],
    GIVEN
  )
  expect(typed.code).toBe(1)
  expect(typed.refusals[0]).toContain("rename page-type")
})

const TREE = "akasha"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const idOf = (one: string): string => `01a06f4c-2a91-7000-8000-00000000000${one}`

const HELD = aType(idOf("1"), "held", ["page"], ["keyed", "other"])

const OTHER_PROPERTY = aProperty(idOf("2"), "other", "file-property")

const HELD_TYPE_AT = join(TREE, HELD[0])

const KEYED_AT = `${TREE}/keyed.file-property.ts`

const PAGE_AT = `${TREE}/one.held.ts`

const BESIDE_AT = `${TREE}/one.held.keyed.md`

const PART_AT = `${TREE}/one.held.keyed.part2.md`

const UNCOMMITTED_AT = `${TREE}/one.held.keyed.uncommitted.md`

const OTHER_AT = `${TREE}/one.held.other.md`

const CARRIED_AT = `${TREE}/one.held.read-by.md`

const CARRIED_PART_AT = `${TREE}/one.held.read-by.part2.md`

const CARRIED_UNCOMMITTED_AT = `${TREE}/one.held.read-by.uncommitted.md`

const HELD_TYPE_BODY = `export type Held = {
  id: string
  pageTypeSlug: string
  slug: string
  keyed: string
  other: string
}

${bodyOf(HELD[1])}`

const KEYED_BODY = `export const keyed = {
  id: "${idOf("3")}",
  pageTypeSlug: "file-property",
  slug: "keyed",
  propertySlug: "keyed",
} as const
`

const PAGE_BODY = `import type { Held } from "./held.page-type.ts"

export const one = {
  id: "${idOf("4")}",
  pageTypeSlug: "held",
  slug: "one",
  keyed: "md",
  other: "md",
} as const satisfies Held
`

const BESIDE_BODY = "what the property holds\n"

const PART_BODY = "the second file the property is held in\n"

const UNCOMMITTED_BODY = "what has not been committed\n"

const OTHER_BODY = "what another property holds\n"

function worldWith(): string {
  const root = scratch.rootFor("akasha-key-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [at, value] of [...VOCABULARY, OTHER_PROPERTY]) {
    put(root, join(TREE, at), bodyOf(value))
  }
  put(root, HELD_TYPE_AT, HELD_TYPE_BODY)
  put(root, KEYED_AT, KEYED_BODY)
  put(root, PAGE_AT, PAGE_BODY)
  put(root, BESIDE_AT, BESIDE_BODY)
  put(root, PART_AT, PART_BODY)
  put(root, OTHER_AT, OTHER_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "*.uncommitted.md\n")
  rebuiltIn(root, TREE)
  put(root, UNCOMMITTED_AT, UNCOMMITTED_BODY)
  admitting(root)
  return root
}

function givenIn(root: string): Given {
  return { root, calledAs: "akasha refactor", from: root, writer: null, agentId: null }
}

function bodyIn(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

function told(said: Answer): string {
  return said.report.join("\n")
}

async function keyRenamed(root: string, dry = false): Promise<Answer> {
  const argv = [
    "rename",
    "property-slug",
    "--from",
    "file-property/keyed",
    "--to",
    "read-by",
    ...(dry ? ["--dry-run"] : []),
  ]
  return await refactor(argv, givenIn(root))
}

test("a key rename carries the file named for the old key to the new key", async () => {
  const root = worldWith()
  const said = await keyRenamed(root)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(there(root, BESIDE_AT)).toBe(false)
  expect(there(root, CARRIED_AT)).toBe(true)
  expect(bodyIn(root, CARRIED_AT)).toBe(BESIDE_BODY)
  expect(bodyIn(root, PAGE_AT)).toContain('readBy: "md"')
  expect(bodyIn(root, KEYED_AT)).toContain('propertySlug: "read-by"')
})

test("a numbered part of that property's file is carried too", async () => {
  const root = worldWith()
  const said = await keyRenamed(root)
  expect(said.refusals).toEqual([])
  expect(there(root, PART_AT)).toBe(false)
  expect(there(root, CARRIED_PART_AT)).toBe(true)
  expect(bodyIn(root, CARRIED_PART_AT)).toBe(PART_BODY)
})

test("a file holding the property uncommitted is carried with its body left alone", async () => {
  const root = worldWith()
  const said = await keyRenamed(root)
  expect(said.refusals).toEqual([])
  expect(there(root, UNCOMMITTED_AT)).toBe(false)
  expect(there(root, CARRIED_UNCOMMITTED_AT)).toBe(true)
  expect(bodyIn(root, CARRIED_UNCOMMITTED_AT)).toBe(UNCOMMITTED_BODY)
  expect(gitIn(root, ["ls-files", "--", CARRIED_UNCOMMITTED_AT]).trim()).toBe("")
})

test("a file beside the page named for another key is left where it is", async () => {
  const root = worldWith()
  const said = await keyRenamed(root)
  expect(said.refusals).toEqual([])
  expect(there(root, OTHER_AT)).toBe(true)
  expect(bodyIn(root, OTHER_AT)).toBe(OTHER_BODY)
})

test("a dry run names every file a key rename would carry and writes nothing", async () => {
  const root = worldWith()
  const was = gitIn(root, ["rev-parse", "HEAD"]).trim()
  const said = await keyRenamed(root, true)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(told(said)).toContain(`  ${BESIDE_AT} -> ${CARRIED_AT}`)
  expect(told(said)).toContain(`  ${PART_AT} -> ${CARRIED_PART_AT}`)
  expect(told(said)).toContain(`  ${UNCOMMITTED_AT} -> ${CARRIED_UNCOMMITTED_AT}`)
  expect(there(root, BESIDE_AT)).toBe(true)
  expect(there(root, CARRIED_AT)).toBe(false)
  expect(gitIn(root, ["rev-parse", "HEAD"]).trim()).toBe(was)
})
