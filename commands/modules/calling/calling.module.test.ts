import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { DATA, INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { calling, commandsIn, HELP } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  ANSWERS,
  ANSWERS_LATER,
  ANSWERS_NOTHING,
  bootstrapped,
  COMMAND_TYPE,
  namespacesIn,
  OUTSIDE,
  rootWith,
  sweep,
  THROWS_NO_ERROR,
  WILL_NOT_LOAD,
} from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import { idTakenFrom } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

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
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain(`carries the id \`${COMMAND_TYPE}\``)
  expect(said.refusals[0]).toContain("nothing says which pages are commands")
  expect(said.refusals[0]).not.toContain("carries no command")
})

test("naming no command is answered with the commands there are", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("takes a command")
  expect(said.refusals[0]).toContain("akasha held")
})

test("a name no command carries is refused, and the commands are listed", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("`nowhere` is no command akasha carries")
  expect(said.refusals[0]).not.toContain("Did you mean")
})

test("a name near a command's is refused with that command pointed at", async () => {
  const root = rootWith([{ slug: "audit", body: ANSWERS }])
  const said = await calling(["audt"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("`audt` is no command akasha carries.")
  expect(said.refusals[0]).toContain("Did you mean `audit`?")
})

test("a name near a namespace's is refused with that namespace pointed at", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  namespacesIn(root, [
    { slug: "change", definition: "what a landing carries", parts: ["command/held"] },
  ])
  const said = await calling(["chnge", "draft"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("`chnge` is no command akasha carries.")
  expect(said.refusals[0]).toContain("Did you mean `change`?")
})

test("a name carried by more than one command is refused rather than chosen between", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, also: "akasha/elsewhere/held.command.ts" }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
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
  expect(said.report[1]).toBe("akasha a b c d e")
})

test("the deepest level a command is at is read, not a shallower one", async () => {
  const root = rootWith([
    { slug: "a", body: ANSWERS },
    { slug: "a-b", body: ANSWERS },
    { slug: "a-b-c", body: ANSWERS },
  ])
  const said = await calling(["a", "b", "c", "d"], { ...OUTSIDE, root })
  expect(said.report[0]).toBe("d")
  expect(said.report[1]).toBe("akasha a b c")
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
  expect(said.report[1]).toBe("akasha track session")
})

test("a joined name carried by more than one command is refused rather than shortened", async () => {
  const root = rootWith([
    { slug: "track", body: ANSWERS },
    { slug: "track-session", body: ANSWERS, also: "akasha/elsewhere/track-session.command.ts" },
  ])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("`track-session` is carried by 2 commands")
  expect(said.refusals[0]).toContain("names more than one")
})

test("no run of leading words naming a command is refused under the first word", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["track", "session", "open"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
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

test("a command reached under a namespace is answered rather than the namespace", async () => {
  const root = rootWith([{ slug: "track-session-open", body: ANSWERS }])
  namespacesIn(root, [
    {
      slug: "track-session",
      definition: "the stretches",
      parts: ["command/track-session-open"],
    },
  ])
  const said = await calling(["track", "session", "open", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one")
  expect(said.report[1]).toBe("akasha track session open")
})

test("a command reached in one hyphenated word keeps that hyphen in the call", async () => {
  const root = rootWith([{ slug: "work-tree", body: ANSWERS }])
  const said = await calling(["work-tree", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[1]).toBe("akasha work-tree")
})

test("a command page whose code answers to nothing callable is refused", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_NOTHING }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("answers to nothing that can be called")
})

test("a command page whose code will not load is refused with why, not with a guess", async () => {
  const root = rootWith([{ slug: "held", body: WILL_NOT_LOAD }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("could not be loaded — ")
  expect(said.refusals[0]).not.toContain("answers to nothing")
})

test("a command page throwing what is no Error is still refused with what it said", async () => {
  const root = rootWith([{ slug: "held", body: THROWS_NO_ERROR }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("could not be loaded — the value was never set")
})

test("a command answering later is waited for rather than handed back as it is", async () => {
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

test("`index refresh` with no index at all is answered without the index", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  bootstrapped(root)
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.refusals[0]).toContain("so there is no index to build")
  expect(said.refusals.join(" ")).not.toContain("was looked for and not read")
})

test("a name looked for where no index is answers as unread", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toContain("was looked for and not read")
  expect(said.refusals[0]).not.toContain("is no command akasha carries")
  expect(said.refusals[0]).not.toContain("bun -e ")
})

test("a name looked for where no index is builds nothing and names the call that would", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.refusals[0]).toContain("Say `akasha index refresh`")
  expect(said.refusals[0]).not.toContain("built again")
})

test("the commands there are come from the index", () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS },
    { slug: "other", body: ANSWERS },
  ])
  expect(commandsIn(root)).toEqual(["held", "other"])
})

test("a command under a namespace is named by the call reaching it", () => {
  const root = rootWith([{ slug: "change-draft", body: ANSWERS, name: "draft" }])
  namespacesIn(root, [
    {
      slug: "change",
      name: "change",
      definition: "what a landing carries",
      parts: ["command/change-draft"],
    },
  ])
  expect(commandsIn(root)).toEqual(["change draft"])
})

test("the commands a refusal lists are the calls reaching them", async () => {
  const root = rootWith([{ slug: "change-draft", body: ANSWERS, name: "draft" }])
  namespacesIn(root, [
    {
      slug: "change",
      name: "change",
      definition: "what a landing carries",
      parts: ["command/change-draft"],
    },
  ])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("  akasha change draft")
  expect(said.refusals[0]).not.toContain("akasha change-draft")
})

test("a name near a command's is pointed at as the call reaching that command", async () => {
  const root = rootWith([{ slug: "change-draft", body: ANSWERS, name: "draft" }])
  namespacesIn(root, [
    {
      slug: "change",
      name: "change",
      definition: "what a landing carries",
      parts: ["command/change-draft"],
    },
  ])
  const said = await calling(["change-draf"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("Did you mean `change draft`?")
})

test("a name no command carries is told where the surface is written down", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toContain("Say `akasha --help` for what each of them takes.")
})
