import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { idTakenFrom } from "@akasha/indexes/testing"
import {
  calling,
  commandsIn,
  HELP,
  HELP_SHORT,
  type Surface,
  wordsIn,
} from "./calling.module.code.ts"
import {
  ANSWERS,
  ANSWERS_LATER,
  ANSWERS_NOTHING,
  bootstrapped,
  COMMAND_TYPE,
  OUTSIDE,
  REPAIR_AT,
  rootWith,
  SAYS_KIND,
  sweep,
  THROWS_NO_ERROR,
  WILL_NOT_LOAD,
} from "./calling.module.test-fixtures.ts"

afterAll(sweep)

test("a command is found through the index and handed the rest of the line", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["held", "one", "two"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one two")
  expect(said.report[1]).toBe("akasha held")
})

test("a command is found though the page type saying what one is carries another slug", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }], "instruction")
  const said = await calling(["held", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one")
})

test("an index naming no page that says which pages are commands says so", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  idTakenFrom(root, COMMAND_TYPE)
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain(`carries the id \`${COMMAND_TYPE}\``)
  expect(said.refusals[0]).toContain("nothing says which pages are commands")
  expect(said.refusals[0]).not.toContain("carries no command")
})

test("naming no command is answered with the commands there are", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes a command")
  expect(said.refusals[0]).toContain("akasha held")
})

test("a name no command carries is refused, and the commands are listed", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`nowhere` is no command akasha carries")
})

test("a name carried by more than one command is refused rather than chosen between", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, also: "akasha/elsewhere/held.command.ts" }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names more than one")
})

test("the walk goes as deep as the words offer, through levels carrying no command", async () => {
  const root = rootWith([
    { slug: "a", body: ANSWERS },
    { slug: "a-b-c-d-e", body: ANSWERS },
  ])
  const said = await calling(["a", "b", "c", "d", "e", "f"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("f")
  expect(said.report[1]).toBe("akasha a-b-c-d-e")
})

test("the deepest level a command is at is read, not a shallower one", async () => {
  const root = rootWith([
    { slug: "a", body: ANSWERS },
    { slug: "a-b", body: ANSWERS },
    { slug: "a-b-c", body: ANSWERS },
  ])
  const said = await calling(["a", "b", "c", "d"], { ...OUTSIDE, root })
  expect(said.report[0]).toBe("d")
  expect(said.report[1]).toBe("akasha a-b-c")
})

test("a shorter name is read where the longer one is carried by no command", async () => {
  const root = rootWith([{ slug: "track", body: ANSWERS }])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("session open")
  expect(said.report[1]).toBe("akasha track")
})

test("a level above the deepest is read where nothing deeper is reached", async () => {
  const root = rootWith([
    { slug: "track", body: ANSWERS },
    { slug: "track-session", body: ANSWERS },
  ])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("open")
  expect(said.report[1]).toBe("akasha track-session")
})

test("a joined name carried by more than one command is refused rather than shortened", async () => {
  const root = rootWith([
    { slug: "track", body: ANSWERS },
    { slug: "track-session", body: ANSWERS, also: "akasha/elsewhere/track-session.command.ts" },
  ])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`track-session` is carried by 2 commands")
  expect(said.refusals[0]).toContain("names more than one")
})

test("no run of leading words naming a command is refused under the first word", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`track` is no command akasha carries")
})

test("a word steps a whole level, so a longer word reaches no command below", async () => {
  const root = rootWith([
    { slug: "track", body: ANSWERS },
    { slug: "track-session", body: ANSWERS },
  ])
  const said = await calling(["track", "sessions"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("sessions")
  expect(said.report[1]).toBe("akasha track")
})

test("the words walked down end at the first word that could be no slug", () => {
  expect(wordsIn(["music", "now", "playing"])).toEqual(["music", "now", "playing"])
  expect(wordsIn(["read", "--file-path", "one"])).toEqual(["read"])
  expect(wordsIn(["read", "-h"])).toEqual(["read"])
  expect(wordsIn(["read", "one/two.ts"])).toEqual(["read"])
  expect(wordsIn(["read", "One"])).toEqual(["read"])
  expect(wordsIn(["Read"])).toEqual([])
  expect(wordsIn([])).toEqual([])
  expect(wordsIn(["a", "b", "c", "d", "e"])).toEqual(["a", "b", "c", "d", "e"])
})

test("a command page whose code answers to nothing callable is refused", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_NOTHING }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("answers to nothing that can be called")
})

test("a command page whose code will not load is refused with why, not with a guess", async () => {
  const root = rootWith([{ slug: "held", body: WILL_NOT_LOAD }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be loaded — ")
  expect(said.refusals[0]).not.toContain("answers to nothing")
})

test("a command page throwing what is no Error is still refused with what it said", async () => {
  const root = rootWith([{ slug: "held", body: THROWS_NO_ERROR }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be loaded — the value was never set")
})

test("a command answering later is waited for rather than handed back as it stands", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_LATER }])
  const said = await calling(["held", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one")
  expect(said.report[1]).toBe("akasha held")
})

test("the command that repairs the index is found through the index as any other is", async () => {
  const root = rootWith([{ slug: "index", body: ANSWERS }])
  const said = await calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("refresh")
  expect(said.report[1]).toBe("akasha index")
})

test("a file at the path the bootstrap loaded is listed among no commands", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  bootstrapped(root)
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  akasha held")
  expect(said.report).not.toContain("  akasha index")
})

test("`index` with no index at all is refused rather than found by its path", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  bootstrapped(root)
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("was looked for and not read")
})

test("a name looked for where no index is answers as unread and says how to build one", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("was looked for and not read")
  expect(said.refusals[0]).not.toContain("is no command akasha carries")
  expect(said.refusals[0]).toContain("bun -e ")
  expect(said.refusals[0]).toContain(join(root, REPAIR_AT))
  expect(said.refusals[0]).not.toContain("is found without the index")
})

test("the commands there are come from the index", () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS },
    { slug: "other", body: ANSWERS },
  ])
  expect(commandsIn(root)).toEqual(["held", "other"])
})

const SURFACED: Surface = {
  taking: [{ said: "--file-path <path>", takes: "a path it takes" }],
  helpNotes: ["it repeats."],
}

test("asking for help lists the commands with what each page says it is for", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toContain("  akasha held  what held is for")
  expect(said.report).toContain("say `akasha <command> --help` for what one takes")
})

test("`-h` says what `--help` says", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  expect(await calling([HELP_SHORT], { ...OUTSIDE, root })).toEqual(
    await calling([HELP], { ...OUTSIDE, root })
  )
})

test("a command whose page states no definition is listed by name alone", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  akasha held")
})

test("a command answers for help out of the surface its own page states", async () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS, definition: "what held is for", surface: SURFACED },
  ])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha held — what held is for")
  expect(said.report).toContain("  --file-path <path>  a path it takes")
  expect(said.report).toContain("it repeats.")
})

test("a command stating no surface is handed the flag to answer for itself", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("--help")
})

test("a name no command carries is told where the surface is written down", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("Say `akasha --help` for what each of them takes.")
})

const CARRIED = { slug: "change-mechanical", runsChecks: false, runsWarrants: false }

test("the change kind a call already carries is what the command is handed", async () => {
  const root = rootWith([{ slug: "held", body: SAYS_KIND }])
  const said = await calling(["held"], { ...OUTSIDE, root, changeKind: CARRIED })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe(JSON.stringify(CARRIED))
})

test("a change kind no page states is handed as none, so everything runs", async () => {
  const root = rootWith([{ slug: "held", body: SAYS_KIND }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("null")
})
