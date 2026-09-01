import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { noPathsFiled, pathFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages-system/shadow"
import { bytesOf } from "@akasha/testing-system/bodying"
import {
  change,
  gone,
  landing,
  proposing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Found } from "./shell-clean.code-check.code.ts"
import {
  besideIn,
  carriedIn,
  foundIn,
  judgedOf,
  lookedOver,
  reasonOf,
  shellClean,
} from "./shell-clean.code-check.code.ts"

const HERE = "shell-clean-"

const HELD_ID = "01a05991-d998-7000-b3f5-2a1c0d7e4b91"

const AWAY = "/held"

const ONE = "akasha/one.sh"

const TWO = "akasha/two.sh"

const CLEAN = '#!/usr/bin/env bash\nset -euo pipefail\n\necho "held"\n'

const FAULT = "#!/usr/bin/env bash\nset -euo pipefail\n\nheld=$1\necho $held\n"

const PART_AT = "akasha/part/part.sh"

const MAIN_AT = "akasha/main.sh"

const PART = '#!/usr/bin/env bash\n\nHELD_PART="held"\n'

const MAIN =
  "#!/usr/bin/env bash\nset -euo pipefail\n\n" +
  `# shellcheck source=${PART_AT}\n` +
  '. "$PART_DIR/part.sh"\n\necho "$HELD_PART"\n'

const UNQUOTED = "Double quote to prevent globbing"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = realpathSync(scratch.rootFor(HERE))
  noPathsFiled(root)
  return root
}

function marked(path: string, line: number, column: number): Found {
  return { path, line, column, code: 2086, level: "info", said: "Held." }
}

test("the files judged are the shell scripts the change carries, said in order", () => {
  const held = landing(AWAY, {
    [TWO]: bytesOf(CLEAN),
    [ONE]: bytesOf(CLEAN),
    "akasha/held.md": bytesOf("held"),
  })
  expect(carriedIn(held)).toEqual([ONE, TWO])
})

test("a shell script the change names twice is judged once", () => {
  const bodies: Record<string, Uint8Array> = { [ONE]: bytesOf(CLEAN) }
  const at = (path: string): Uint8Array | null => bodies[path] ?? null
  expect(carriedIn({ root: AWAY, changed: [ONE, ONE], before: at, after: at })).toEqual([ONE])
})

test("a file the change takes away is judged by nothing", () => {
  expect(carriedIn(change(AWAY, [ONE], gone))).toEqual([])
})

test("a change carrying no shell script is judged by no run", () => {
  const root = rooted()
  const held = landing(root, { "akasha/held.md": bytesOf("held") })
  expect(shellClean(held, shadowAt(root))).toEqual([])
})

test("a change the linter finds nothing in is not refused", () => {
  const root = rooted()
  expect(shellClean(landing(root, { [ONE]: bytesOf(CLEAN) }), shadowAt(root))).toEqual([])
})

test("a change the linter finds fault in is refused, and the reason names the code", () => {
  const root = rooted()
  const said = shellClean(landing(root, { [ONE]: bytesOf(FAULT) }), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(ONE)
  expect(said[0]?.reason).toContain("SC2086")
  expect(said[0]?.reason).toContain(UNQUOTED)
})

test("every finding is answered against the file it stands in, in the order they stand", () => {
  const root = rooted()
  const held = landing(root, { [ONE]: bytesOf(FAULT), [TWO]: bytesOf(FAULT) })
  expect(shellClean(held, shadowAt(root)).map((one) => one.path)).toEqual([ONE, TWO])
})

test("findings are put in order rather than left in the one the linter printed them in", () => {
  const found = [marked(TWO, 1, 1), marked(ONE, 9, 2), marked(ONE, 9, 1), marked(ONE, 2, 1)]
  const said = judgedOf({ found, failed: null }, ONE, AWAY)
  expect(said.map((one) => `${one.path} ${one.reason}`)).toEqual([
    `${ONE} ${reasonOf(marked(ONE, 2, 1))}`,
    `${ONE} ${reasonOf(marked(ONE, 9, 1))}`,
    `${ONE} ${reasonOf(marked(ONE, 9, 2))}`,
    `${TWO} ${reasonOf(marked(TWO, 1, 1))}`,
  ])
})

test("a change is judged by the body it proposes, not the one standing on disk", () => {
  const root = rooted()
  const at = join(root, ONE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, CLEAN)
  const said = shellClean(change(root, [ONE], proposing(root, ONE, FAULT)), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain("SC2086")
  expect(readFileSync(at, "utf8")).toBe(CLEAN)
  expect(shellClean(change(root, [ONE]), shadowAt(root))).toEqual([])
})

test("a change taking a fault away is not refused, though the fault still stands on disk", () => {
  const root = rooted()
  const at = join(root, ONE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, FAULT)
  expect(shellClean(change(root, [ONE], proposing(root, ONE, CLEAN)), shadowAt(root))).toEqual([])
})

test("the world names every shell script the index files as well as the ones carried", () => {
  const root = rooted()
  pathFiled(root, PART_AT, [{ path: PART_AT, id: HELD_ID }])
  const held = landing(root, { [MAIN_AT]: bytesOf(MAIN), "akasha/held.md": bytesOf("held") })
  expect(besideIn(held, shadowAt(root))).toEqual([MAIN_AT, PART_AT])
})

test("a sourced script the change does not carry is there for the linter to follow", () => {
  const root = rooted()
  for (const one of [
    { at: PART_AT, body: PART },
    { at: MAIN_AT, body: MAIN },
  ]) {
    const full = join(root, one.at)
    mkdirSync(dirname(full), { recursive: true })
    writeFileSync(full, one.body)
    pathFiled(root, one.at, [{ path: one.at, id: HELD_ID }])
  }
  expect(shellClean(change(root, [MAIN_AT]), shadowAt(root))).toEqual([])
})

test("a sourced script the index does not file is a refusal rather than a clean answer", () => {
  const root = rooted()
  const at = join(root, MAIN_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, MAIN)
  pathFiled(root, MAIN_AT, [{ path: MAIN_AT, id: HELD_ID }])
  const said = shellClean(change(root, [MAIN_AT]), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain("SC1091")
})

test("a linter that could not run is a refusal, not a clean answer", () => {
  const looked = lookedOver(AWAY, [ONE], null)
  expect(looked.found).toEqual([])
  const said = judgedOf(looked, ONE, AWAY)
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(ONE)
  expect(said[0]?.reason).toContain("stands on PATH")
  expect(said[0]?.reason).toContain("nothing was looked at")
  expect(said[0]?.reason).toContain("verified nothing")
})

test("a run that failed is answered against the first file named, outside the world it ran in", () => {
  const looked = { found: [], failed: `nothing stands at ${AWAY}/${ONE}, under ${AWAY}` }
  const said = judgedOf(looked, ONE, AWAY)
  expect(said[0]?.reason).toBe(
    `nothing stands at ${ONE}, under the world this change was stood up in. ` +
      "A linter that could not look has verified nothing, so this change is not judged."
  )
})

test("a finding is said as its code, where it stands and what the linter said", () => {
  expect(reasonOf(marked(ONE, 12, 7))).toBe("SC2086 (info) at line 12, column 7 — Held.")
})

test("the file a finding stands in is named by the refusal rather than said twice", () => {
  const said = judgedOf({ found: [marked(TWO, 1, 1)], failed: null }, ONE, AWAY)
  expect(said[0]?.path).toBe(TWO)
  expect(said[0]?.reason).not.toContain(TWO)
})

test("an answer that is not the shape json1 has is read as no answer at all", () => {
  expect(foundIn("held")).toBeNull()
  expect(foundIn("[]")).toBeNull()
  expect(foundIn("{}")).toBeNull()
  expect(foundIn('{"comments":[{"file":"one.sh","line":1}]}')).toBeNull()
  expect(foundIn('{"comments":[]}')).toEqual([])
})

test("a shell script wakes the check and a file of any other kind does not", () => {
  const root = rooted()
  const shadow = shadowAt(root)
  const held = [ONE, "akasha/one.ts", "akasha/held.md"]
  expect(held.map((one) => shellClean.isInput(one, shadow))).toEqual([true, false, false])
})
