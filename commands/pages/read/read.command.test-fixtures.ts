import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Reading } from "akasha/agents/read-record/read-record.module.code.ts"
import { blobIdOf, readingIn } from "akasha/agents/read-record/read-record.module.code.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { full as fullArgument } from "akasha/commands/arguments/pages/full.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  ANSWER_CEILING,
  costOf,
  linesFor,
  readWith,
  restCall,
  type SeatAt,
  tellingWith,
} from "akasha/commands/pages/read/read.command.code.ts"
import { read as readCommand } from "akasha/commands/pages/read/read.command.ts"
import {
  SEEDED_AT,
  warrantsSeeded,
} from "akasha/domains/context/modules/warranting/warranting.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { mintedId } from "akasha/testing-system/minting/minting.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { said as saying } from "akasha/utils/run/running/running.module.code.ts"

export const CALLED_AS = "akasha read"

const SHOWN: Readonly<Record<string, string>> = {
  "argument/file-path": filePath.said,
  "argument/full": fullArgument.said,
}

export const TAKING = readCommand.arguments.map((one) => ({
  said: SHOWN[one.argument] ?? one.argument,
}))

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

export const SEAT_PAGE = "agents/seats/pages/held.seat.ts"

export const BIN = "akasha/one/held.bin"

const SEATLESS: SeatAt = () => null

export function seatedAt(at: string): SeatAt {
  return (agentId) => (agentId === AGENT ? at : null)
}

export function seatRoot(body = "one\ntwo\n"): string {
  return rootWith([{ at: SEAT_PAGE, body }])
}

export function read(argv: readonly string[], given: Given, seatAt: SeatAt = SEATLESS): Answer {
  return readWith(argv, given, null, seatAt)
}

export function argued(argv: readonly string[]): Answer {
  return read(argv, givenFor(rootWith([])))
}

export type Rooted = { readonly root: string; readonly said: Answer }

export function bareRead(at: string | null): Rooted {
  const root = seatRoot()
  return { root, said: read([], givenFor(root), at === null ? SEATLESS : seatedAt(at)) }
}

export type Besided = Rooted & { readonly asked: () => number }

export function besideSeat(): Besided {
  const root = rootWith([
    { at: HELD, body: "one\n" },
    { at: SEAT_PAGE, body: "seat\n" },
  ])
  let asked = 0
  const said = read(["--file-path", HELD], givenFor(root), () => {
    asked += 1
    return SEAT_PAGE
  })
  return { root, said, asked: () => asked }
}

export function binRead(bytes: readonly number[]): Rooted {
  const root = rootWith([{ at: BIN, body: new Uint8Array(bytes) }])
  return { root, said: read(["--file-path", BIN], givenFor(root)) }
}

export type Overflowed = Rooted & {
  readonly left: readonly string[]
  readonly returned: readonly string[]
}

export function overMany(): Overflowed {
  const root = rootWith(manyFiles())
  const said = read(namingAll(), givenFor(root))
  return { root, said, left: leftIn(said.report), returned: wholeIn(said.report) }
}

export function restOfMany(): Overflowed {
  const root = rootWith(manyFiles())
  const left = leftIn(read(namingAll(), givenFor(root)).report)
  const said = read(namingEach(left), givenFor(root))
  return { root, said, left, returned: wholeIn(said.report) }
}

export type Moved = { readonly said: Answer; readonly held: Reading | null; readonly now: string }

export function movedAfterCommit(): Moved {
  const root = heldRoot(lettered(80))
  committed(root, HELD)
  read(["--file-path", HELD], givenFor(root))
  const now = lettered(80).replace("line 40 ", "line forty ")
  writeFileSync(join(root, HELD), now)
  const said = read(["--file-path", HELD], givenFor(root))
  return { said, held: readingIn(root, AGENT, HELD), now }
}

export function heldRoot(body = "one\n"): string {
  return rootWith([{ at: HELD, body }])
}

export function heldRead(body?: string): Rooted {
  const root = heldRoot(body)
  return { root, said: read(["--file-path", HELD], givenFor(root)) }
}

export function namingEach(paths: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const one of paths) said.push("--file-path", one)
  return said
}

export function committed(root: string, path: string): undefined {
  for (const one of [
    ["init", "--quiet"],
    ["add", "--", path],
    ["-c", "user.email=h@a", "-c", "user.name=h", "commit", "--quiet", "-m", path, "--", path],
  ]) {
    saying(["git", "-C", root, ...one])
  }
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
    carriedOid: null,
  }
  return tellingWith(HELD, bytes, blobIdOf(bytes), seen, was)
}

const CONTEXT_WARRANT = "context-warrant"

const PAGE_TYPE_SLUG = "page-type"

export const THING = "akasha/one/held.thing.ts"

export const THING_TYPE = "akasha/kind/thing.page-type.ts"

const PAGE_TYPE = "akasha/kind/page.page-type.ts"

export const STRAY = "../elsewhere.ts"

type Planted = {
  readonly slug: string
  readonly name: string
  readonly code: string
}

const THING_BODY = 'export const thing = { slug: "thing", extendsSlug: ["page-type/page"] }\n'

const PAGE_BODY = 'export const page = { slug: "page", extendsSlug: [] }\n'

const TYPES: readonly {
  readonly slug: string
  readonly at: string
  readonly body: string
  readonly above: readonly string[]
}[] = [
  { slug: "thing", at: THING_TYPE, body: THING_BODY, above: ["page-type/page"] },
  { slug: "page", at: PAGE_TYPE, body: PAGE_BODY, above: [] },
]

export const WARRANTED: readonly string[] = [THING, THING_TYPE]

export function thingRoot(): string {
  return rootWarranting([{ at: THING, body: "one\n" }])
}

export function namedOnly(): Answer {
  return read(["--file-path", THING], givenFor(thingRoot()))
}

export function strayRoot(): string {
  return rootWarranting([{ at: THING, body: "one\n" }], [straying("says-away", "saysAway", STRAY)])
}

export function leftIn(report: readonly string[]): readonly string[] {
  const said = report[report.length - 1] ?? ""
  return said.startsWith(`${CALLED_AS} --file-path `) ? said.split(" --file-path ").slice(1) : []
}

export function everyPaged(): readonly string[] {
  return namingPages().filter((one) => one !== "--file-path")
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
  const second = read(namingEach(left), givenFor(root))
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
  const call = restCall(CALLED_AS, left, false)
  const held = costOf(linesFor(two, bodyOf(body)))
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

function straying(slug: string, name: string, path: string): Planted {
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

function rootWarranting(
  named: readonly { readonly at: string; readonly body: string | Uint8Array }[],
  also: readonly Planted[] = []
): string {
  const root = rootWith([...named, ...TYPES.map((one) => ({ at: one.at, body: one.body }))])
  for (const [order, one] of TYPES.entries()) {
    const id = `01a04f59-0000-7000-8000-${String(order).padStart(12, "0")}`
    listedFiled(root, PAGE_TYPE_SLUG, one.slug, [{ path: one.at, id }])
    valueAlsoFiled(root, PAGE_TYPE_SLUG, [
      {
        path: one.at,
        value: {
          id,
          pageTypeSlug: PAGE_TYPE_SLUG,
          slug: one.slug,
          extendsSlug: one.above,
        },
      },
    ])
  }
  warrantsSeeded(root)
  for (const one of also) {
    const id = mintedId(one.slug)
    const at = join(SEEDED_AT, `${one.slug}.context-warrant.ts`)
    writing(root, at, pageFor(one, id))
    writing(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code)
    listedFiled(root, CONTEXT_WARRANT, one.slug, [{ path: at, id }])
    valueAlsoFiled(root, CONTEXT_WARRANT, [
      { path: at, value: { id, pageTypeSlug: CONTEXT_WARRANT, slug: one.slug } },
    ])
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
