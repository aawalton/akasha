import { afterAll, test as check, expect } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { scratch, staged } from "@akasha/checks/typecheck/testing"
import type { Given } from "../../calling/calling.module.code.ts"
import {
  filesUnder,
  meaning,
  NOT_THE_FOLDER,
  REACHED,
  typecheck,
} from "./typecheck.command.code.ts"

afterAll(scratch.sweep)

const CLEAN = "export const one: number = 1\n"

const WRONG = "export const one: string = 1\n"

const IMPORTING = 'import { one } from "./one.ts"\n\nexport const two: string = one\n'

function given(root: string): Given {
  return { root, calledAs: "akasha typecheck", from: root, writer: null, agentId: null }
}

check("a run naming nothing is refused rather than judging the folder", () => {
  const said = meaning([])
  expect(said.refusal).toContain("names nothing")
  expect(said.refusal).toContain("akasha audit --check typecheck")
})

check("an argument this does not take is refused by name", () => {
  expect(meaning(["--write"]).refusal).toContain("`--write` is not an argument this takes")
  expect(meaning(["--file-path"]).refusal).toContain("nothing followed it")
})

check("the seeded flag is read wherever it stands among the paths", () => {
  const said = meaning(["--file-path", "akasha/one.ts", "--seeded"])
  expect(said.seeded).toBe(true)
  expect(said.paths).toEqual(["akasha/one.ts"])
})

check("a path outside the akasha folder is refused, and nothing is judged", () => {
  const root = staged({ "akasha/one.ts": CLEAN })
  const said = typecheck(["--file-path", "tools/one.ts"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stands outside `akasha/`")
})

check("a file the folder does not compile is refused rather than read clean", () => {
  const root = staged({ "akasha/one.ts": CLEAN, "akasha/held.md": "held\n" })
  const said = typecheck(["--file-path", "akasha/held.md"], given(root))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("no file the folder compiles")
})

check("a file that compiles answers 0, and says what was judged and what was not", () => {
  const root = staged({ "akasha/one.ts": CLEAN })
  const said = typecheck(["--file-path", "akasha/one.ts"], given(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(
    "typecheck judged 1 file, the 1 file named and 0 files importing them, and none refused"
  )
  expect(said.report[1]).toBe(NOT_THE_FOLDER)
})

check("a file whose type does not hold is refused as an audit says it, naming the line", () => {
  const root = staged({ "akasha/one.ts": WRONG })
  const said = typecheck(["--file-path", "akasha/one.ts"], given(root))
  expect(said.code).toBe(2)
  expect(said.report[0]).toContain("1 refusal in all")
  expect(said.refusals).toHaveLength(1)
  expect(said.refusals[0]).toStartWith("akasha/one.ts — line 1: TS2322: ")
  expect(said.refusals[0]).not.toContain(REACHED)
})

check("a file importing a file named is judged too, and marked as reached", () => {
  const root = staged({ "akasha/one.ts": CLEAN, "akasha/two.ts": IMPORTING })
  const said = typecheck(["--file-path", "akasha/one.ts"], given(root))
  expect(said.code).toBe(2)
  expect(said.report[0]).toContain("2 files, the 1 file named and 1 file importing them")
  expect(said.refusals[0]).toStartWith("akasha/two.ts — line 3: TS2322: ")
  expect(said.refusals[0]).toEndWith(` — ${REACHED}`)
})

check("a folder named is the compiled files under it", () => {
  const root = staged({ "akasha/held/one.ts": CLEAN, "akasha/held/two.ts": WRONG })
  expect(filesUnder(root, ["akasha/held"])).toEqual(["akasha/held/one.ts", "akasha/held/two.ts"])
  const said = typecheck(["--file-path", "akasha/held"], given(root))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toStartWith("akasha/held/two.ts — line 1: TS2322: ")
})

check("a seeded run draws a diagnostic from a clean file, and writes nothing", () => {
  const root = staged({ "akasha/one.ts": CLEAN })
  const said = typecheck(["--file-path", "akasha/one.ts", "--seeded"], given(root))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha/one.ts — seen: 1 diagnostic with a fault seeded into it")
  expect(said.report[1]).toContain("nothing was written")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe(CLEAN)
})

check("a clean run over the same file is clean, so the seeded diagnostic was the seed", () => {
  const root = staged({ "akasha/one.ts": CLEAN })
  expect(typecheck(["--file-path", "akasha/one.ts", "--seeded"], given(root)).code).toBe(0)
  expect(typecheck(["--file-path", "akasha/one.ts"], given(root)).code).toBe(0)
})
