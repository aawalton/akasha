import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { editsIn } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  appending,
  changing,
  type Loading,
  noPageSaid,
  owedBy,
  owingBy,
  pathsNamedBy,
  stamped,
  textIn,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
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
  HELD,
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
  presenceIn,
  readingNotText,
  refusedApply,
  removing,
  repo,
  SPARE_CODE,
  SPARE_PAGE,
  saysApply,
  taking,
} from "akasha/commands/modules/change-running/change-running.module.test-fixtures.ts"
import {
  NAMER_CODE,
  NAMER_PAGE,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const ANSWERS_NOTHING: Loading = async () => ({
  run: () => ({ edits: [], refused: null }),
  guards: [],
})

test("a run whose change answered no edit says that change answered none", async () => {
  const said = `${taking(NAMER_PAGE)}draft: true\n`

  const answered = await changing(
    repo(),
    PAGE,
    null,
    ["remove-page"],
    piping(said),
    ANSWERS_NOTHING,
    applying,
    CHOSEN
  )

  expect(answered.code).toBe(0)
  expect(answered.report[0] ?? "").toContain("`remove-page` answered no edit")
})

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
    "`--file-path` is no flag this takes. `akasha change` takes no flag at all.",
    `\`${NAMER_PAGE}\` is no flag this takes. \`akasha change\` takes no flag at all.`,
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

test("a path under the folder git does not track is refused, and names the sweep", async () => {
  const root = repo()

  const said = await removing(root, ".git/data/reads")

  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0] ?? "").toContain("akasha git sweep")
  expect(pathsIn(root)).toEqual([])
})

test("a path handed through a fence loses the newline that fence ends it with", async () => {
  const root = repo()

  const said = await acting(root, ["remove-page"], piping(`at ~\n${NAMER_PAGE}\n~\n`))

  expect(said.refusals).toEqual([])
  expect(keptIn(root)).toEqual(BOTH)
})

test("a path running over more than one line is refused", async () => {
  const said = `at ~\n${NAMER_PAGE}\n${SPARE_PAGE}\n~\n`

  const answered = await acting(repo(), ["remove-page"], piping(said))

  expect(answered.refusals[0] ?? "").toContain("`at` names one path")
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

test("the reading a change owes is the reading that change's own edits owe", () => {
  const asked: FileChange = { kind: "add", path: "a/asked.ts", content: "two" }

  const said = pathsNamedBy(["a/kept.ts", "a/asked.ts"], [asked])

  expect(said).toEqual(["a/asked.ts"])
})

test("an edit kept before is owed nothing again by the change drafted after it", () => {
  const asked: FileChange = { kind: "add", path: "a/asked.ts", content: "two" }

  const said = pathsNamedBy(["a/kept.ts"], [asked])

  expect(said).toEqual([])
})

test("a move names the path it leaves and the path it reaches", () => {
  const moved: FileChange = { kind: "move", pathFrom: "a/one.ts", pathTo: "a/two.ts" }

  const said = pathsNamedBy(["a/one.ts", "a/two.ts", "a/kept.ts"], [moved])

  expect(said).toEqual(["a/one.ts", "a/two.ts"])
})

test("the refusal opens with the retry and names where to look before it explains", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("Run this same call again")
  expect(said).toContain("nothing was kept and nothing was lost")
  expect(said.indexOf("subagent-presence.log")).toBeLessThan(said.indexOf("still be queued"))
})

test("the refusal promises no outcome from waiting and names no call an agent is refused", () => {
  const root = repo()

  const said = noPageSaid(root, presenceIn(root))

  expect(said).toContain("waiting will not mend it")
  expect(said).toContain("nothing may have started it")
  expect(said).not.toContain("bun ")
})

test("a call naming no agent at all is refused without the retry", () => {
  const root = repo()
  presenceIn(root)

  expect(noPageSaid(root, null)).not.toContain("Run this same call again")
})

test("a change whose writer owes no reading appends without asking the record", async () => {
  const root = repo()

  const said = await appending(root, PAGE, null, false, async () => HELD)

  expect(said.code).toBe(0)
  expect(pathsIn(root)).toEqual(["a/b.ts"])
})
