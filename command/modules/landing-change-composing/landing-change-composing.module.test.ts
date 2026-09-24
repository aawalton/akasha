import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { applied } from "akasha/command/modules/applying/applying.module.code.ts"
import { NO_GATE } from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  git,
  repoWith,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import {
  besideBefore,
  besideRebased,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  textIn,
  scratch as world,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

afterAll(world.sweep, 5000)

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const REFERENCED = "akasha/a.domain.referenced-by.jsonl"

const naming = (slug: string): string =>
  `{"propertySlug":"import","path":"akasha/${slug}.domain.ts"}`

test("a beside file the tree no longer holds leaves the body this landing composed alone", () => {
  const root = scratch.rootFor("akasha-composing-")
  const was = `${naming("one")}\n${naming("two")}\n`
  const then = `${naming("new")}\n${naming("one")}\n${naming("two")}\n`
  const held = besideBefore(root, "HEAD", [
    { kind: "replace", path: REFERENCED, contentFrom: was, contentTo: then },
  ])
  const said = besideRebased(root, [{ path: REFERENCED, body: BYTES.encode(then) }], held)
  const body = said[0]?.body
  expect(body === undefined || body === null ? null : TEXT.decode(body)).toBe(then)
})

const BESIDE = "akasha/a.page-type.shapes.jsonl"

const rowFor = (slug: string, target: string): string =>
  JSON.stringify({
    pageTypeSlug: "a",
    targetPageTypeSlug: target,
    unique: null,
    uniquePropertySlug: null,
    slug,
    propertySlug: slug,
    fileName: null,
    folderName: null,
  })

const WAS = rowFor("a-zero", "zeta")

const NOW = rowFor("a-zero", "omega")

const MINE = rowFor("m-mine", "beta")

const OTHER = rowFor("o-other", "alpha")

test("a shapes row another landing filed while this one was judged is kept, and the row this one changed wins", async () => {
  const root = repoWith({ [BESIDE]: `${WAS}\n` })
  const overlapping: Judging = {
    named: ["overlapping"],
    checksFor: () => ["overlapping"],
    over: async () => {
      writeFileSync(join(root, BESIDE), `${WAS}\n${OTHER}\n`)
      git(root, ["add", "-A"])
      git(root, ["commit", "--quiet", "-m", "the other landing"])
      return []
    },
  }
  const rows: readonly FileChange[] = [
    { kind: "replace", path: BESIDE, contentFrom: `${WAS}\n`, contentTo: `${NOW}\n${MINE}\n` },
  ]
  expect("refusals" in (await landing(root, rows, "mine", overlapping))).toBe(false)
  expect(git(root, ["show", `HEAD:${BESIDE}`])).toBe(`${NOW}\n${MINE}\n${OTHER}\n`)
})

const FROM = "akasha/four"

const INTO = "akasha/six"

const OUTSIDE_CODE = "akasha/five/outer.module.code.ts"

const NAMED_INSIDE = `${INTO}/holder.module.ts`

const MOVED_BESIDE = `${INTO}/deep/gamma.module.referenced-by.jsonl`

const moduleAt = (slug: string, said: string, rest: Record<string, unknown>): string =>
  pageOf({
    id: `01a04a4a-0004-7000-8000-00000000000${said}`,
    type: `${pageType.slug}/module`,
    slug,
    definition: "a page a folder move carries",
    ...rest,
  })

const MOVING: Readonly<Record<string, string>> = {
  ".gitignore": "*.uncommitted.*\n",
  [`${FROM}/deep/gamma.module.ts`]: moduleAt("gamma", "1", { code: "ts" }),
  [`${FROM}/deep/gamma.module.code.ts`]: "export const gamma = 3\n",
  [`${FROM}/holder.module.ts`]: moduleAt("holder", "2", { note: "gamma" }),
  "akasha/five/outer.module.ts": moduleAt("outer", "3", { code: "ts" }),
  [OUTSIDE_CODE]:
    'import { gamma } from "../four/deep/gamma.module.code.ts"\n\nexport const outer = gamma + 1\n',
}

const RUNNING = { checks: false, writerOwesReading: false, readersOweReading: false }

async function movedFolder(): Promise<string> {
  const root = indexedRepo(MOVING)
  const read = textIn(root)
  const moves: readonly FileMove[] = git(root, ["ls-files", FROM])
    .trim()
    .split("\n")
    .map((one) => ({ from: one, to: `${INTO}${one.slice(FROM.length)}` }))
  const rows: readonly FileChange[] = [
    {
      kind: "add",
      path: OUTSIDE_CODE,
      content: (read(OUTSIDE_CODE) ?? "").replace("../four/", "../six/"),
    },
  ]
  const landed = await applied(root, null, "the folder moves", NO_GATE, null, [], {
    rows,
    running: RUNNING,
    moves,
  })
  if ("refusals" in landed) throw new Error(landed.refusals.join("; "))
  return root
}

test("a folder move keeps the row an importer outside that folder files", async () => {
  const root = await movedFolder()

  const body = git(root, ["show", `HEAD:${MOVED_BESIDE}`])

  expect(body).toContain(OUTSIDE_CODE)
  expect(body).toContain(NAMED_INSIDE)
})

const SECOND_PAGE = OUTSIDE_CODE.replace("outer.module.code.ts", "second.module.ts")

const NAMED_BEFORE = `${FROM}/holder.module.ts`

async function movedWhileFiled(): Promise<string> {
  const root = indexedRepo(MOVING)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "the beside files are on the tree"])
  const read = textIn(root)
  const moves: readonly FileMove[] = git(root, ["ls-files", FROM])
    .trim()
    .split("\n")
    .map((one) => ({ from: one, to: `${INTO}${one.slice(FROM.length)}` }))
  const filing: Judging = {
    named: ["filing"],
    checksFor: () => ["filing"],
    over: async () => {
      const said = await applied(root, null, "another landing files a row", NO_GATE, null, [], {
        rows: [
          { kind: "add", path: SECOND_PAGE, content: moduleAt("second", "4", { note: "gamma" }) },
        ],
        running: RUNNING,
      })
      if ("refusals" in said) throw new Error(said.refusals.join("; "))
      return []
    },
  }
  const rows: readonly FileChange[] = [
    {
      kind: "add",
      path: OUTSIDE_CODE,
      content: (read(OUTSIDE_CODE) ?? "").replace("../four/", "../six/"),
    },
  ]
  const landed = await applied(root, null, "the folder moves", filing, null, [], {
    rows,
    running: { ...RUNNING, checks: true },
    moves,
  })
  if ("refusals" in landed) throw new Error(landed.refusals.join("; "))
  return root
}

test("a folder move keeps a row another landing filed while the move was judged", async () => {
  const root = await movedWhileFiled()

  const body = git(root, ["show", `HEAD:${MOVED_BESIDE}`])

  expect(body).toContain(SECOND_PAGE)
  expect(body).toContain(NAMED_INSIDE)
  expect(body).not.toContain(NAMED_BEFORE)
})

const GENERATING = join(rootOf(import.meta.dir), "page/type/page-type.page-type.type-generator.ts")

const DOMAIN_AT = `${pageType.slug}/${domain.slug}`

const PARENT_AT = "akasha/five/parent.page-type.ts"

const CARRIER_AT = `${FROM}/carrier.page-type.ts`

const CARRIER_INTO = `${INTO}/carrier.page-type.ts`

const SCHEMA_INTO = `${INTO}/carrier.page-type.schema.jsonl`

const holding = (slugs: readonly string[]): readonly Record<string, unknown>[] =>
  slugs.map((one) => ({ pagePropertySlug: one, required: false, many: false }))

const parentOf = (slugs: readonly string[]): string =>
  bodyOf({
    id: idOf("2"),
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "parent",
    extends: [DOMAIN_AT],
    properties: holding(slugs),
  })

const carrierOf = (slugs: readonly string[], filing: boolean): string =>
  bodyOf({
    id: idOf("1"),
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "carrier",
    extends: ["page-type/parent"],
    properties: holding(slugs),
    ...(filing ? { schema: "jsonl" } : {}),
  })

const FILING: Readonly<Record<string, string>> = {
  ".gitignore": "*.uncommitted.*\n",
  "akasha/page-type.page-type.ts": bodyOf({
    id: idOf("3"),
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "page-type",
    extends: [DOMAIN_AT],
    properties: [],
    typeGenerator: "ts",
  }),
  "akasha/page-type.page-type.type-generator.ts": `export { generateTypes, couldTurn } from "${GENERATING}"\n`,
  [PARENT_AT]: parentOf([]),
  [CARRIER_AT]: carrierOf(["note"], false),
}

async function carrierFiling(): Promise<string> {
  const root = indexedRepo(FILING)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "the beside files are on the tree"])
  const said = await applied(root, null, "the carrier files a schema", NO_GATE, null, [], {
    rows: [{ kind: "add", path: CARRIER_AT, content: carrierOf(["note"], true) }],
    running: RUNNING,
  })
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  return root
}

async function movedWhileCarrying(): Promise<string> {
  const root = await carrierFiling()
  const moves: readonly FileMove[] = git(root, ["ls-files", FROM])
    .trim()
    .split("\n")
    .map((one) => ({ from: one, to: `${INTO}${one.slice(FROM.length)}` }))
  const filing: Judging = {
    named: ["filing"],
    checksFor: () => ["filing"],
    over: async () => {
      const said = await applied(root, null, "the parent gains a property", NO_GATE, null, [], {
        rows: [{ kind: "add", path: PARENT_AT, content: parentOf(["code"]) }],
        running: RUNNING,
      })
      if ("refusals" in said) throw new Error(said.refusals.join("; "))
      return []
    },
  }
  const landed = await applied(root, null, "the folder moves", filing, null, [], {
    rows: [{ kind: "add", path: CARRIER_INTO, content: carrierOf(["note", "test"], true) }],
    running: { ...RUNNING, checks: true },
    moves,
  })
  if ("refusals" in landed) throw new Error(landed.refusals.join("; "))
  return root
}

test("a folder move keeps a schema row another landing filed while the move was judged", async () => {
  const root = await movedWhileCarrying()

  const body = git(root, ["show", `HEAD:${SCHEMA_INTO}`])

  expect(body).toContain('"key":"test"')
  expect(body).toContain('"key":"code"')
})
