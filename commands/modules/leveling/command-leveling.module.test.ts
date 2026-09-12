import { afterAll, expect, test } from "bun:test"
import {
  ANSWERS,
  COMMAND,
  namespacesIn,
  rootWith,
  sweep,
} from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"
import {
  levelNamed,
  levelOfPart,
  levelsIn,
  levelsOf,
} from "akasha/commands/modules/leveling/command-leveling.module.code.ts"

afterAll(sweep)

const TYPES = ["command", "namespace"]

test("a part names the level its page type and its slug reach", () => {
  const root = rootWith([
    { slug: "track-open", body: ANSWERS, name: "open", definition: "open one" },
  ])
  const one = levelsOf(levelsIn(root, TYPES), "command/track-open")[0]
  expect(one?.named).toBe("open")
  expect(one?.type).toBe("command")
  expect(one?.slug).toBe("track-open")
})

test("a level stating no name is named by its slug", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const levels = levelsIn(root, TYPES)
  expect(levelsOf(levels, "command/held")[0]?.named).toBe("held")
  expect(levelNamed(levels, TYPES)("held")).toBe(null)
})

test("the name a level states is the name that level is reached by", () => {
  const root = rootWith([{ slug: "track-open", body: ANSWERS, name: "open" }])
  const levels = levelsIn(root, TYPES)
  expect(levelNamed(levels, TYPES)("track-open")).toBe("open")
  expect(levelNamed(levels, TYPES)("nowhere")).toBe(null)
})

test("the parts a level states come with that level", () => {
  const root = rootWith([{ slug: "track-open", body: ANSWERS, name: "open" }], COMMAND, [
    "namespace/track",
  ])
  namespacesIn(root, [{ slug: "track", name: "track", parts: ["command/track-open"] }])
  const one = levelsOf(levelsIn(root, TYPES), "namespace/track")[0]
  expect(one?.parts).toEqual(["command/track-open"])
})

test("a part naming no level answers with none", () => {
  const levels = levelsIn(rootWith([{ slug: "held", body: ANSWERS }]), TYPES)
  expect(levelsOf(levels, "module/held")).toEqual([])
  expect(levelsOf(levels, "held")).toEqual([])
  expect(levelOfPart(levels, "module/held")).toBe(null)
})

test("a part is listed by the name and the definition its page states", () => {
  const root = rootWith([
    { slug: "track-open", body: ANSWERS, name: "open", definition: "open one" },
  ])
  expect(levelOfPart(levelsIn(root, TYPES), "command/track-open")).toEqual({
    named: "open",
    said: "open one",
  })
})

test("a slug more than one page carries answers with each of them", () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, also: "akasha/elsewhere/held.command.ts" }])
  expect(levelsOf(levelsIn(root, TYPES), "command/held").length).toBe(2)
})
