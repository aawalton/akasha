import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Found } from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.code.ts"
import {
  besideIn,
  carriedIn,
  foundIn,
  judgedOf,
  lookedOver,
  reasonOf,
  refusalsOver,
} from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.code.ts"
import {
  CLEAN,
  FAULT,
  FILED_AT,
  ONE,
  rooted,
  scratch,
  scripted,
  UNQUOTED,
} from "akasha/check/code/pages/shell-clean/shell-clean.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  change,
  gone,
  landing,
  proposing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AWAY = "/held"

const TWO = "akasha/two.sh"

const PART_AT = "akasha/part/part.sh"

const MAIN_AT = "akasha/main.sh"

const PART = '#!/usr/bin/env bash\n\nHELD_PART="held"\n'

const MAIN =
  "#!/usr/bin/env bash\nset -euo pipefail\n\n" +
  `# shellcheck source=${PART_AT}\n` +
  '. "$PART_DIR/part.sh"\n\necho "$HELD_PART"\n'

afterAll(scratch.sweep)

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
  expect(refusalsOver(held, shadowAt(root))).toEqual([])
})

test("a change the linter finds nothing in is not refused", () => {
  const root = rooted()
  expect(refusalsOver(landing(root, { [ONE]: bytesOf(CLEAN) }), shadowAt(root))).toEqual([])
})

test("a change the linter finds fault in is refused, and the reason names the code", () => {
  const root = rooted()
  const said = refusalsOver(landing(root, { [ONE]: bytesOf(FAULT) }), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(ONE)
  expect(said[0]?.reason).toContain("SC2086")
  expect(said[0]?.reason).toContain(UNQUOTED)
})

test("every finding is answered against the file it is in, in the order they are in", () => {
  const root = rooted()
  const held = landing(root, { [ONE]: bytesOf(FAULT), [TWO]: bytesOf(FAULT) })
  expect(refusalsOver(held, shadowAt(root)).map((one) => one.path)).toEqual([ONE, TWO])
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

test("a change is judged by the body it proposes, not the one on disk", () => {
  const root = rooted()
  const at = join(root, ONE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, CLEAN)
  const said = refusalsOver(change(root, [ONE], proposing(root, ONE, FAULT)), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain("SC2086")
  expect(readFileSync(at, "utf8")).toBe(CLEAN)
  expect(refusalsOver(change(root, [ONE]), shadowAt(root))).toEqual([])
})

test("a change taking a fault away is not refused, though the fault is still on disk", () => {
  const root = rooted()
  const at = join(root, ONE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, FAULT)
  const held = change(root, [ONE], proposing(root, ONE, CLEAN))
  expect(refusalsOver(held, shadowAt(root))).toEqual([])
})

test("the mirror names every shell script a page carries as well as the ones the change carries", () => {
  const root = rooted()
  scripted(root)
  const held = landing(root, { [MAIN_AT]: bytesOf(MAIN), "akasha/held.md": bytesOf("held") })
  expect(besideIn(held, shadowAt(root))).toEqual([MAIN_AT, FILED_AT])
})

test("a shell script the tree holds but no page carries is left out once a shell property answers", () => {
  const root = rooted()
  scripted(root)
  const at = join(root, PART_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, PART)
  const held = landing(root, { [MAIN_AT]: bytesOf(MAIN) })
  expect(besideIn(held, shadowAt(root))).toEqual([MAIN_AT, FILED_AT])
})

test("the mirror falls back to every shell script the tree holds where no shell property answers", () => {
  const root = rooted()
  const at = join(root, PART_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, PART)
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
  }
  expect(refusalsOver(change(root, [MAIN_AT]), shadowAt(root))).toEqual([])
})

test("a sourced script the index does not file is a refusal rather than a clean answer", () => {
  const root = rooted()
  const at = join(root, MAIN_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, MAIN)
  const said = refusalsOver(change(root, [MAIN_AT]), shadowAt(root))
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain("SC1091")
})

test("a linter that could not run is unmeasured, not a clean answer", () => {
  const looked = lookedOver(AWAY, [ONE], null)
  expect(looked.found).toEqual([])
  const said = judgedOf(looked, ONE, AWAY)
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe(ONE)
  expect(said[0]?.threw).toBe(true)
  expect(said[0]?.reason).toContain("is on PATH")
  expect(said[0]?.reason).toContain("nothing was looked at")
  expect(said[0]?.reason).toContain("verified nothing")
})

test("a finding the linter did look at refuses rather than going unmeasured", () => {
  const said = judgedOf({ found: [marked(ONE, 1, 1)], failed: null }, ONE, AWAY)
  expect(said[0]?.threw).toBeUndefined()
})

test("a run that failed is answered against the first file named, outside the mirror it read", () => {
  const looked = { found: [], failed: `nothing is at ${AWAY}/${ONE}, under ${AWAY}` }
  const said = judgedOf(looked, ONE, AWAY)
  expect(said[0]?.reason).toBe(
    `nothing is at ${ONE}, under the mirror this change was written into. ` +
      "A linter that could not look has verified nothing, so this change is not judged."
  )
})

test("a finding is said as its code, where it is and what the linter said", () => {
  expect(reasonOf(marked(ONE, 12, 7))).toBe("SC2086 (info) at line 12, column 7 — Held.")
})

test("the file a finding sits in is named by the refusal rather than said twice", () => {
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
