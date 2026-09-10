import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { NAMER_CODE, NAMER_PAGE, scratch } from "@akasha/indexes/indexing/testing"
import { editsIn } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  appending,
  changing,
  owedBy,
  owingBy,
  stamped,
  textIn,
} from "./change-running.module.code.ts"
import {
  APPLIED,
  acting,
  applying,
  BOTH,
  CHOSEN,
  drafting,
  draftingAndApplying,
  draftingAndMeasuring,
  EDIT,
  givenIn,
  HANDED_ONE,
  HELD,
  handing,
  keptIn,
  loading,
  MEASURED,
  MISSING,
  measuring,
  measuringWrongly,
  NOT_TEXT_SAID,
  owedIn,
  PAGE,
  pathsIn,
  piping,
  readingNotText,
  refusedApply,
  removing,
  repo,
  SPARE_CODE,
  SPARE_PAGE,
  SUB,
  saysApply,
  taking,
} from "./change-running.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a change answers its edits and appends the edits beside the calling agent's page", async () => {
  const root = repo()

  const said = await removing(root, NAMER_PAGE)

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(keptIn(root)).toEqual(BOTH)
})

test("the edits are kept beside the agent's page rather than beside the page changed", async () => {
  const root = repo()

  await removing(root, NAMER_PAGE)

  expect(editsIn(root, NAMER_PAGE)).toEqual({ rows: [] })
  expect(pathsIn(root).length).toBe(2)
})

test("a change reads the world as every edit appended before that change had landed", async () => {
  const root = repo()
  await removing(root, NAMER_PAGE)

  const said = await removing(root, NAMER_PAGE)

  expect(said.refusals).toEqual([`\`${NAMER_PAGE}\` names no page, so no page is taken away`])
  expect(keptIn(root)).toEqual(BOTH)
})

test("two runs leave two sets of edits in the order the runs were made", async () => {
  const root = repo()

  await removing(root, NAMER_PAGE)
  await removing(root, SPARE_PAGE)

  const said = pathsIn(root)
  expect(said.length).toBe(4)
  expect([...said.slice(0, 2)].sort()).toEqual([NAMER_CODE, NAMER_PAGE])
  expect([...said.slice(2)].sort()).toEqual([SPARE_CODE, SPARE_PAGE])
})

test("a change that refuses appends nothing and says why that change refused", async () => {
  const root = repo()

  const said = await removing(root, MISSING)

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(pathsIn(root)).toEqual([])
})

test("a word naming no change is refused by that word rather than by an address", async () => {
  const said = await acting(repo(), ["remove-file"], piping(taking(NAMER_PAGE)))

  expect(said.refusals[0] ?? "").toContain("`remove-file` names no change")
})

test("a call naming no change is refused with the changes this runs", async () => {
  const said = await acting(repo(), [])

  expect(said.refusals[0] ?? "").toContain("no change is named")
})

test("a flag said on the command line is refused", async () => {
  const argv = ["remove-page", "--file-path", NAMER_PAGE]

  const said = await acting(repo(), argv, piping(taking(NAMER_PAGE)))

  expect(said.refusals).toEqual([
    "`--file-path` is no flag this takes",
    `\`${NAMER_PAGE}\` is no flag this takes`,
  ])
})

test("a call piping nothing in is refused rather than run with no argument", async () => {
  const said = await acting(repo(), ["remove-page"])

  expect(said.refusals[0] ?? "").toContain("standard input")
})

test("arguments that read as neither a value nor a body are refused", async () => {
  const said = await acting(repo(), ["remove-page"], piping("nonsense\n"))

  expect(said.refusals[0] ?? "").toContain("neither")
})

test("a path outside the repository is refused", async () => {
  const said = await removing(repo(), "/etc/hosts")

  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0] ?? "").toContain("is no path inside the repository")
})

test("a path that is no page keeps no edits", async () => {
  const said = await changing(
    repo(),
    "akasha/notes.md",
    null,
    ["remove-page"],
    piping(taking(NAMER_PAGE)),
    loading,
    applying,
    CHOSEN
  )

  expect(said.refusals).toEqual(["a path that is no page keeps no edits"])
})

test("a change answering says how many subagents handed edits over", async () => {
  const root = repo()
  handing(root, SUB, [HANDED_ONE])

  const said = await removing(root, NAMER_PAGE)

  expect(said.report).toContain("1 subagent(s) handed edits over, which `akasha change list` names")
})

test("a change kind saying its readers owe no reading is read as saying so", () => {
  expect(owedBy({ slug: "remove-page", readersOweReading: false })).toBe(false)
})

test("a change kind saying its readers owe reading is read as saying so", () => {
  expect(owedBy({ slug: "add-file", readersOweReading: true })).toBe(true)
})

test("a change kind saying nothing there leaves its readers owing the reading", () => {
  expect(owedBy({ slug: "add-file" })).toBe(true)
  expect(owedBy(null)).toBe(true)
})

test("a change owing its readers no reading stamps that on every edit it answers", () => {
  const said = stamped(HELD, false, true)

  expect(said.edits).toEqual([{ ...EDIT, readersOweReading: false }])
})

test("a change whose writer owes no reading stamps that on every edit it answers", () => {
  const said = stamped(HELD, true, false)

  expect(said.edits).toEqual([{ ...EDIT, writerOwesReading: false }])
})

test("a change kind saying its writer owes no reading is read as saying so", () => {
  expect(owingBy({ slug: "add-file", writerOwesReading: false })).toBe(false)
  expect(owingBy({ slug: "add-file", writerOwesReading: true })).toBe(true)
  expect(owingBy(null)).toBe(true)
})

test("a change owing its readers reading stamps nothing on the edits it answers", () => {
  const said = stamped(HELD, true, true)

  expect(said.edits).toEqual([EDIT])
})

test("a change whose kind owes its readers no reading stamps that on every row appended", async () => {
  const root = repo()

  await removing(root, NAMER_PAGE)

  expect(owedIn(root)).toEqual([false, false])
})

test("an apply asked for in the arguments commits the message those arguments name", async () => {
  APPLIED.length = 0

  const said = await removing(repo(), NAMER_PAGE, "takes the namer away")

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(APPLIED).toEqual(["takes the namer away"])
})

test("the apply asked for is not handed to the change as an argument", async () => {
  APPLIED.length = 0

  await removing(repo(), NAMER_PAGE, "takes the namer away")

  expect(Object.keys(givenIn())).toEqual(["at"])
})

test("an apply asked for says nothing of the edits being kept for a later apply", async () => {
  APPLIED.length = 0

  const said = await removing(repo(), NAMER_PAGE, "takes the namer away")

  expect(saysApply(said)).toBe(false)
  expect(said.report).toContain("applied takes the namer away")
})

test("a change that refuses applies nothing though an apply was asked for", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await removing(root, MISSING, "takes the missing page away")

  expect(said.refusals).toEqual([`\`${MISSING}\` names no page, so no page is taken away`])
  expect(APPLIED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("an empty message is refused and appends nothing", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await removing(root, NAMER_PAGE, "")

  expect(said.refusals[0] ?? "").toContain("`message` says what the commit is for")
  expect(APPLIED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("a change naming no message lands rather than keeping its edits for a later apply", async () => {
  APPLIED.length = 0

  const said = await removing(repo(), NAMER_PAGE)

  expect(said.code).toBe(0)
  expect(APPLIED.length).toBe(1)
  expect(saysApply(said)).toBe(false)
})

test("a change naming no message takes the message the apply composes", async () => {
  APPLIED.length = 0

  await removing(repo(), NAMER_PAGE)

  expect(APPLIED).toEqual([null])
})

test("an apply that refuses says the edits are kept and what lands them", async () => {
  const root = repo()

  const said = await refusedApply(root, NAMER_PAGE)

  expect(said.code).toBe(3)
  expect(saysApply(said)).toBe(true)
  expect(keptIn(root)).toEqual(BOTH)
})

test("a change naming draft keeps its edits for a later apply and lands nothing", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await drafting(root, NAMER_PAGE)

  expect(said.code).toBe(0)
  expect(APPLIED).toEqual([])
  expect(saysApply(said)).toBe(true)
  expect(keptIn(root)).toEqual(BOTH)
})

test("a change naming draft and message together is refused and appends nothing", async () => {
  APPLIED.length = 0
  const root = repo()

  const said = await draftingAndApplying(root, NAMER_PAGE)

  expect(said.refusals[0] ?? "").toContain("`draft` declines")
  expect(APPLIED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("a change naming measure hands the apply that measure", async () => {
  MEASURED.length = 0

  const said = await measuring(repo(), NAMER_PAGE)

  expect(said.code).toBe(0)
  expect(MEASURED).toEqual([true])
})

test("the measure asked for is not handed to the change as an argument", async () => {
  MEASURED.length = 0

  await measuring(repo(), NAMER_PAGE)

  expect(Object.keys(givenIn())).toEqual(["at"])
})

test("a change naming no measure hands the apply no measure", async () => {
  MEASURED.length = 0

  await removing(repo(), NAMER_PAGE)

  expect(MEASURED).toEqual([false])
})

test("a measure saying anything but true is refused and appends nothing", async () => {
  MEASURED.length = 0
  const root = repo()

  const said = await measuringWrongly(root, NAMER_PAGE)

  expect(said.refusals[0] ?? "").toContain("`measure` takes `true`")
  expect(MEASURED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("a change naming draft and measure together is refused and appends nothing", async () => {
  MEASURED.length = 0
  const root = repo()

  const said = await draftingAndMeasuring(root, NAMER_PAGE)

  expect(said.refusals[0] ?? "").toContain("`draft` declines")
  expect(MEASURED).toEqual([])
  expect(pathsIn(root)).toEqual([])
})

test("a path a folder sits at holds no body, so a change reads that path as empty", () => {
  const root = repo()
  mkdirSync(join(root, "akasha/folder.ts"), { recursive: true })

  expect(textIn(root)("akasha/folder.ts")).toBeNull()
})

test("a body that is not text refuses the change rather than being read as text", async () => {
  const root = repo()

  const said = await appending(root, PAGE, null, false, readingNotText(root))

  expect(said.code).toBe(3)
  expect(said.refusals).toEqual([NOT_TEXT_SAID])
  expect(pathsIn(root)).toEqual([])
})

test("a change whose writer owes reading asks the record before appending its edits", async () => {
  const root = repo()

  const said = await appending(root, PAGE, null, true, async () => HELD)

  expect(said.code).toBe(3)
  expect(said.refusals[0] ?? "").toContain("names no agent")
  expect(pathsIn(root)).toEqual([])
})

test("a change whose writer owes no reading appends without asking the record", async () => {
  const root = repo()

  const said = await appending(root, PAGE, null, false, async () => HELD)

  expect(said.code).toBe(0)
  expect(pathsIn(root)).toEqual(["a/b.ts"])
})
