import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { expect, test } from "bun:test"
import { calling, commandsIn } from "./calling.module.code.ts"

const COMMANDS_AT = ".git/data/index/identity/command/slug"

const ANSWERS = `export function held(argv, given) {
  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }
}
`

const ANSWERS_NOTHING = `export const held = 1\n`

const WILL_NOT_LOAD = `export function held( {\n`

function rootWith(
  named: readonly { readonly slug: string; readonly body: string; readonly also?: string }[]
): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-calling-"))
  mkdirSync(join(root, COMMANDS_AT), { recursive: true })
  let minted = 0
  for (const one of named) {
    const at = `akasha/command-system/command/${one.slug}/${one.slug}.command.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    writeFileSync(join(root, at), `export const ${one.slug} = { slug: "${one.slug}" }\n`)
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const lines = [JSON.stringify({ path: at, id: `01a04bdd-0000-7000-8000-00000000000${minted}` })]
    if (one.also !== undefined) {
      lines.push(JSON.stringify({ path: one.also, id: "01a04bdd-0000-7000-8000-000000000099" }))
    }
    writeFileSync(join(root, COMMANDS_AT, `${one.slug}.jsonl`), `${lines.join("\n")}\n`)
  }
  return root
}

const OUTSIDE = { calledAs: "akasha", from: "/nowhere", writer: null }

test("a command is found through the index and handed the rest of the line", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = calling(["held", "one", "two"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one two")
  expect(said.report[1]).toBe("akasha held")
  rmSync(root, { recursive: true })
})

test("naming no command is answered with the commands there are", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = calling([], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes a command")
  expect(said.refusals[0]).toContain("akasha held")
  rmSync(root, { recursive: true })
})

test("a name no command carries is refused, and the commands are listed", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`nowhere` is no command akasha carries")
  rmSync(root, { recursive: true })
})

test("a name carried by more than one command is refused rather than chosen between", () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS, also: "akasha/elsewhere/held.command.ts" },
  ])
  const said = calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names more than one")
  rmSync(root, { recursive: true })
})

test("a command page whose code answers to nothing callable is refused", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_NOTHING }])
  const said = calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("answers to nothing that can be called")
  rmSync(root, { recursive: true })
})

test("a command page whose code will not load is refused with why, not with a guess", () => {
  const root = rootWith([{ slug: "held", body: WILL_NOT_LOAD }])
  const said = calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be loaded — ")
  expect(said.refusals[0]).not.toContain("answers to nothing")
  rmSync(root, { recursive: true })
})

const ROOTED_AT = "akasha/command-system/command/index/index.command.ts"

function rooted(root: string): void {
  const at = join(root, ROOTED_AT)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, 'export const index = { slug: "index" }\n')
  writeFileSync(
    `${at.slice(0, -".ts".length)}.code.ts`,
    "export function index(argv, given) {\n" +
      "  return { report: [argv.join(\" \"), given.calledAs], refusals: [], code: 0 }\n" +
      "}\n"
  )
}

test("the command that repairs the index is found with no index at all", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rooted(root)
  rmSync(join(root, ".git"), { recursive: true })
  const said = calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("refresh")
  expect(said.report[1]).toBe("akasha index")
  rmSync(root, { recursive: true })
})

test("a command found by its path is listed though the index names it nowhere", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rooted(root)
  const said = calling([], { ...OUTSIDE, root })
  expect(said.refusals[0]).toContain("akasha index")
  expect(said.refusals[0]).toContain("akasha held")
  rmSync(root, { recursive: true })
})

test("a name looked for where no index stands is answered as unread, not as uncarried", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rmSync(join(root, ".git"), { recursive: true })
  const said = calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("was looked for and not read")
  expect(said.refusals[0]).not.toContain("is no command akasha carries")
  rmSync(root, { recursive: true })
})

test("the commands there are come from the index", () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS },
    { slug: "other", body: ANSWERS },
  ])
  expect(commandsIn(root)).toEqual(["held", "other"])
  rmSync(root, { recursive: true })
})
