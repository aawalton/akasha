import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { SEEDED_AT } from "../../../context-system/warranting/warranting.module.test-fixtures.ts"
import { standingFiled } from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { bytesOf } from "../../../testing-system/bodying/bodying.module.code.ts"
import { mintedId } from "../../../testing-system/minting/minting.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { blobIdOf } from "../../reading/reading.module.code.ts"
import { scratchWorld } from "../../scratching/scratching.module.code.ts"
import {
  ANSWER_CEILING,
  costOf,
  linesFor,
  readWith,
  restCall,
  tellingWith,
} from "./read.command.code.ts"
import { read as readCommand } from "./read.command.ts"

export const CALLED_AS = "akasha read"

export const TAKING = readCommand.taking

export const AGENT = "01a04e96-c80a-79ef-819f-a455a96a0e54"

export const HELD = "akasha/one/held.ts"

export const MANY = 12

const EACH = 40

export const scratch = scratchWorld()

export function rootWith(
  named: readonly { readonly at: string; readonly body: string | Uint8Array }[]
): string {
  const root = scratch.rootFor("akasha-read-")
  for (const one of named) {
    const at = join(root, one.at)
    mkdirSync(at.slice(0, at.lastIndexOf("/")), { recursive: true })
    writeFileSync(at, one.body)
  }
  return root
}

export function givenAt(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: null }
}

export function givenFor(root: string) {
  return { root, calledAs: CALLED_AS, from: root, writer: null, agentId: AGENT }
}

export const bodyOf = bytesOf

export function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, null)
}

export function manyFiles(): readonly { readonly at: string; readonly body: string }[] {
  const made: { readonly at: string; readonly body: string }[] = []
  for (let one = 0; one < MANY; one += 1) {
    const line = `${"x".repeat(70)}\n`
    made.push({ at: `akasha/many/file-${one}.ts`, body: line.repeat(EACH) })
  }
  return made
}

export function namingAll(): readonly string[] {
  const said: string[] = []
  for (let one = 0; one < MANY; one += 1) said.push("--file-path", `akasha/many/file-${one}.ts`)
  return said
}

export function lettered(many: number): string {
  const said: string[] = []
  for (let one = 0; one < many; one += 1) said.push(`line ${one} ${"x".repeat(60)}`)
  return `${said.join("\n")}\n`
}

export function telling(was: Uint8Array | null, now: string): readonly string[] {
  const bytes = bodyOf(now)
  const seen = {
    path: HELD,
    oid: blobIdOf(was ?? bodyOf("elsewhere\n")),
    seenAt: 1,
    mechanicalOid: null,
  }
  return tellingWith(HELD, bytes, blobIdOf(bytes), seen, was)
}

const CONTEXT_WARRANT = "context-warrant"

const PAGE_TYPE_SLUG = "page-type"

const BESIDE = join(import.meta.dir, "../../../context-system/context-warrant")

export const THING = "akasha/one/held.thing.ts"

export const THING_TYPE = "akasha/kind/thing.page-type.ts"

export const PAGE_TYPE = "akasha/kind/page.page-type.ts"

export const STRAY = "agent/elsewhere.ts"

export type Planted = {
  readonly slug: string
  readonly name: string
  readonly code: string
}

export const THING_BODY = 'export const thing = { slug: "thing", extendsSlug: "page-type/page" }\n'

export const PAGE_BODY = 'export const page = { slug: "page", extendsSlug: null }\n'

const TYPES: readonly { readonly slug: string; readonly at: string; readonly body: string }[] = [
  { slug: "thing", at: THING_TYPE, body: THING_BODY },
  { slug: "page", at: PAGE_TYPE, body: PAGE_BODY },
]

export const WARRANTED: readonly string[] = [THING, THING_TYPE, PAGE_TYPE]

export function thingRoot(): string {
  return rootWarranting([{ at: THING, body: "one\n" }])
}

export function strayRoot(): string {
  return rootWarranting(
    [
      { at: THING, body: "one\n" },
      { at: STRAY, body: "two\n" },
    ],
    [straying("says-away", "saysAway", STRAY)]
  )
}

export function leftIn(report: readonly string[]): readonly string[] {
  const said = report[report.length - 1] ?? ""
  return said.startsWith(`${CALLED_AS} --file-path `) ? said.split(" --file-path ").slice(1) : []
}

export function everyPaged(): readonly string[] {
  return [...namingPages().filter((one) => one !== "--file-path"), THING_TYPE, PAGE_TYPE]
}

export type Ceilinged = {
  readonly first: Answer
  readonly second: Answer
  readonly both: readonly string[]
  readonly left: readonly string[]
}

export function ceilinged(): Ceilinged {
  const root = rootWarranting(manyPages())
  const first = read(namingPages(), givenFor(root))
  const left = leftIn(first.report)
  const again: string[] = []
  for (const one of left) again.push("--file-path", one)
  const second = read(again, givenFor(root))
  return { first, second, both: [...first.report, ...second.report], left }
}

export type Priced = {
  readonly said: Answer
  readonly call: string
}

export function priced(): Priced {
  const one = "akasha/many/page-0.thing.ts"
  const two = "akasha/many/page-1.thing.ts"
  const three = "akasha/many/page-2.thing.ts"
  const body = lettered(5)
  const left = [
    { named: two, absolute: two },
    { named: three, absolute: three },
  ]
  const call = restCall(CALLED_AS, left)
  const held =
    costOf(linesFor(THING_TYPE, bodyOf(THING_BODY))) +
    costOf(linesFor(PAGE_TYPE, bodyOf(PAGE_BODY))) +
    costOf(linesFor(two, bodyOf(body)))
  const want = ANSWER_CEILING - Math.floor(costOf(call) / 2) - held
  const bare = costOf(linesFor(one, bodyOf("x\n")))
  const root = rootWarranting([
    { at: one, body: `${"x".repeat(want - bare + 1)}\n` },
    { at: two, body },
    { at: three, body },
  ])
  const naming = ["--file-path", one, "--file-path", two, "--file-path", three]
  return { said: read(naming, givenFor(root)), call: call[1] ?? "" }
}

export function wholeIn(report: readonly string[]): readonly string[] {
  return report.filter((one) => one.includes("the whole file follows"))
}

export function headedIn(report: readonly string[], path: string): number {
  return report.filter((one) => one.startsWith(`${path} —`)).length
}

function standingFor(name: string, at: string): string {
  return [
    `import { ${name} as held } from ${JSON.stringify(at)}`,
    "",
    `export const ${name} = held`,
    "",
  ].join("\n")
}

const REAL: readonly Planted[] = [
  {
    slug: "file-itself",
    name: "fileItself",
    code: standingFor(
      "fileItself",
      join(BESIDE, "file-itself/file-itself.context-warrant.code.ts")
    ),
  },
  {
    slug: "file-page-type",
    name: "filePageType",
    code: standingFor(
      "filePageType",
      join(BESIDE, "file-page-type/file-page-type.context-warrant.code.ts")
    ),
  },
]

export function straying(slug: string, name: string, path: string): Planted {
  return {
    slug,
    name,
    code: [
      `export function ${name}(root, path) {`,
      `  return path === ${JSON.stringify(THING)}`,
      `    ? [{ path: ${JSON.stringify(path)}, oid: "oid", owed: "owed" }]`,
      "    : []",
      "}",
      "",
    ].join("\n"),
  }
}

function pageFor(one: Planted, id: string): string {
  return [
    `export const ${one.name} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${one.slug}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: true,`,
    `  runsOnWrite: true,`,
    `  transitive: false,`,
    `}`,
    "",
  ].join("\n")
}

function planting(root: string, at: string, body: string): undefined {
  const said = join(root, at)
  mkdirSync(said.slice(0, said.lastIndexOf("/")), { recursive: true })
  writeFileSync(said, body)
}

export function rootWarranting(
  named: readonly { readonly at: string; readonly body: string | Uint8Array }[],
  also: readonly Planted[] = []
): string {
  const root = rootWith([...named, ...TYPES.map((one) => ({ at: one.at, body: one.body }))])
  for (const [order, one] of TYPES.entries()) {
    const id = `01a04f59-0000-7000-8000-${String(order).padStart(12, "0")}`
    standingFiled(root, PAGE_TYPE_SLUG, one.slug, [{ path: one.at, id }])
  }
  for (const one of [...REAL, ...also]) {
    const id = mintedId(one.slug)
    const at = join(SEEDED_AT, `${one.slug}.context-warrant.ts`)
    planting(root, at, pageFor(one, id))
    planting(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code)
    standingFiled(root, CONTEXT_WARRANT, one.slug, [{ path: at, id }])
  }
  return root
}

export function manyPages(): readonly { readonly at: string; readonly body: string }[] {
  const made: { readonly at: string; readonly body: string }[] = []
  for (let one = 0; one < MANY; one += 1) {
    const line = `${"x".repeat(70)}\n`
    made.push({ at: `akasha/many/page-${one}.thing.ts`, body: line.repeat(EACH) })
  }
  return made
}

export function namingPages(): readonly string[] {
  const said: string[] = []
  for (let one = 0; one < MANY; one += 1) {
    said.push("--file-path", `akasha/many/page-${one}.thing.ts`)
  }
  return said
}
