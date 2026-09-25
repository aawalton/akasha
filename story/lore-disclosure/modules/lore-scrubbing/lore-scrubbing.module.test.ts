import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  heldIn,
  heldNotice,
  LEFT_OUT,
  SCRUBBED_BY,
  type Scrubber,
  scrubbedAbove,
  scrubbedRun,
  scrubberFor,
  scrubbing,
  tellsIn,
} from "akasha/story/lore-disclosure/modules/lore-scrubbing/lore-scrubbing.module.code.ts"
import { ASKED } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
  UNDER_GAME_MASTER,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const FACT = "The ferryman remembers every crossing the river has forgotten"

const SECOND = "Seven lanterns burn beneath the northern tide"

const SHORT = "the drowned bell tolls"

const BODY = [
  'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
  "",
  "export const sealed = {",
  '  id: "01a0d600-0000-7000-8000-000000000003",',
  '  type: "page-type/lore",',
  '  slug: "sealed",',
  '  title: "Sealed",',
  `  facts: ["${FACT}", "${SECOND}", "${SHORT}"],`,
  "} as const satisfies Lore",
  "",
].join("\n")

function sealedWorld(): string {
  const root = loreWorld(scratch)
  const at = join(root, LORE_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, BODY)
  return root
}

function scrubberOf(root: string): Scrubber {
  const found = scrubberFor(root, GAME_MASTER_SEAT)
  if (found === null) throw new Error("a game master's seat was given no scrubber")
  return found
}

test("the prose a withheld page states is what is looked for, and no id, type or slug", () => {
  expect(tellsIn(BODY)).toEqual([FACT, SECOND, SHORT])
})

test("a seat of another role is scrubbed nothing", () => {
  expect(scrubberFor(sealedWorld(), OTHER_SEAT)).toBeNull()
  expect(scrubberFor(sealedWorld(), null)).toBeNull()
})

test("a subagent under a game master's seat is scrubbed as the seat is", () => {
  expect(scrubberFor(sealedWorld(), UNDER_GAME_MASTER)).not.toBeNull()
})

test("a line carrying a withheld fact, as a diff or a draft shows it, is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`+    "${FACT}",`, scrubber)).toBe(true)
  expect(heldIn(`  facts: ["${SECOND}"]`, scrubber)).toBe(true)
})

test("a fact escaped into a transcript's JSON is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  const line = JSON.stringify({ content: `     8\t  facts: ["${FACT}"],\n` })
  expect(heldIn(line, scrubber)).toBe(true)
})

test("a fact cut short past five of its words is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`${FACT.slice(0, 40)}… (38 more characters)`, scrubber)).toBe(true)
})

test("a short fact is held where it is whole, whatever its case", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`said: ${SHORT.toUpperCase()}!`, scrubber)).toBe(true)
  expect(heldIn("the drowned bell", scrubber)).toBe(false)
})

test("a line naming the withheld page's path, or none of its prose, is kept", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(LORE_AT, scrubber)).toBe(false)
  expect(heldIn("the ferryman crossed the river at dawn", scrubber)).toBe(false)
})

test("a stream split mid-line is judged by whole lines and keeps its last line's ending", () => {
  const scrubber = scrubberOf(sealedWorld())
  const written: string[] = []
  const stream = scrubbing(scrubber, (text) => written.push(text))
  stream.chunk("kept one\nThe ferryman remembers ev")
  stream.chunk("ery crossing the river has forgotten\nkept two")
  expect(stream.end()).toBe(1)
  expect(written.join("")).toBe(`kept one\n${LEFT_OUT}\nkept two`)
})

test("the notice says how many lines were left out and names nothing from the page", () => {
  const said = heldNotice(2)
  expect(said).toContain("2 lines")
  expect(said).toContain(ASKED)
  expect(said).not.toContain(LORE_AT)
  expect(said).not.toContain("ferryman")
})

test("a program run under the scrubber prints no withheld fact and keeps its exit code", async () => {
  const scrubber = scrubberOf(sealedWorld())
  const out: string[] = []
  const err: string[] = []
  const program = `console.log(${JSON.stringify(FACT)}); console.log("kept"); process.exit(3)`
  const code = await scrubbedRun([process.execPath, "-e", program], scrubber, {
    out: (text) => out.push(text),
    err: (text) => err.push(text),
  })
  expect(code).toBe(3)
  expect(out.join("")).toBe(`${LEFT_OUT}\nkept\n`)
  expect(err.join("")).toContain(ASKED)
})

test("a program run under the scrubber is told the process scrubbing it", async () => {
  const scrubber = scrubberOf(sealedWorld())
  const out: string[] = []
  const program = `console.log(process.env.${SCRUBBED_BY} === String(process.ppid))`
  await scrubbedRun([process.execPath, "-e", program], scrubber, {
    out: (text) => out.push(text),
    err: () => undefined,
  })
  expect(out.join("")).toBe("true\n")
})

test("a call is scrubbed above only where the process above it says it scrubs", () => {
  expect(scrubbedAbove({ [SCRUBBED_BY]: "4242" }, 4242)).toBe(true)
  expect(scrubbedAbove({ [SCRUBBED_BY]: "4242" }, 4243)).toBe(false)
  expect(scrubbedAbove({}, 4242)).toBe(false)
})
