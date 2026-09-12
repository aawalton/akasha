import { expect, test } from "bun:test"
import {
  type Level,
  type Naming,
  type Parting,
  pathOf,
  saidIn,
  walkingIn,
  wordsIn,
} from "akasha/commands/modules/walking/command-walking.module.code.ts"

const NAMED: Naming = (slug) =>
  ({ "track-session-open": "open", "track-session": "session", track: "track" })[slug] ?? null

function level(type: string, slug: string, named: string, parts: readonly string[] = []): Level {
  return { named, slug, type, path: `${slug}.${type}.ts`, parts }
}

const TREE: Readonly<Record<string, Level>> = {
  "namespace/track": level("namespace", "track", "track", ["namespace/track-session"]),
  "namespace/track-session": level("namespace", "track-session", "session", [
    "command/track-session-open",
  ]),
  "command/track-session-open": level("command", "track-session-open", "open"),
  "command/work-tree": level("command", "work-tree", "work-tree"),
}

const ROOT = ["namespace/track", "command/work-tree", "module/held"]

const UNDER: Parting = (part) => {
  const one = TREE[part]
  return one === undefined ? [] : [one]
}

test("each leading word steps one level down from the parts of the level above", () => {
  const said = walkingIn(ROOT, ["track", "session", "open", "one"], UNDER)
  expect(said?.held).toBe(3)
  expect(said?.found[0]?.slug).toBe("track-session-open")
})

test("the page type a level is under is carried with the level reached", () => {
  expect(walkingIn(ROOT, ["track"], UNDER)?.found[0]?.type).toBe("namespace")
  expect(walkingIn(ROOT, ["work-tree"], UNDER)?.found[0]?.type).toBe("command")
})

test("a word other than the name of a level under it ends the descent", () => {
  const said = walkingIn(ROOT, ["track", "sessions", "open"], UNDER)
  expect(said?.held).toBe(1)
  expect(said?.found[0]?.slug).toBe("track")
})

test("a level no level above states as a part is reached by no word", () => {
  expect(walkingIn(ROOT, ["session"], UNDER)).toBe(null)
  expect(walkingIn(ROOT, ["track", "open"], UNDER)?.found[0]?.slug).toBe("track")
})

test("a part that is no level ends no descent", () => {
  expect(walkingIn(ROOT, ["work-tree", "one"], UNDER)?.found[0]?.slug).toBe("work-tree")
})

test("a word that could be no part of a slug ends the descent before that word", () => {
  expect(walkingIn(ROOT, ["track", "--help"], UNDER)?.held).toBe(1)
})

test("a descent starting from no part reaches nothing", () => {
  expect(walkingIn([], ["track"], UNDER)).toBe(null)
})

test("a name more than one level under one level states is carried out whole", () => {
  const twice: Parting = (part) =>
    part === "command/held"
      ? [level("command", "held", "held"), level("command", "held", "held")]
      : []
  expect(walkingIn(["command/held"], ["held"], twice)?.found.length).toBe(2)
})

test("the words taken down end at the first word that could be no slug", () => {
  expect(wordsIn(["music", "now", "playing"])).toEqual(["music", "now", "playing"])
  expect(wordsIn(["read", "--file-path", "one"])).toEqual(["read"])
  expect(wordsIn(["read", "-h"])).toEqual(["read"])
  expect(wordsIn(["read", "one/two.ts"])).toEqual(["read"])
  expect(wordsIn(["read", "One"])).toEqual(["read"])
  expect(wordsIn(["Read"])).toEqual([])
  expect(wordsIn([])).toEqual([])
  expect(wordsIn(["a", "b", "c", "d", "e"])).toEqual(["a", "b", "c", "d", "e"])
})

test("a hyphen inside one word is part of that word", () => {
  expect(wordsIn(["work-tree", "one"])).toEqual(["work-tree", "one"])
})

test("the call is spelled with the spaces the words were written with", () => {
  expect(saidIn(["track", "session", "open", "one"], 3)).toBe("track session open")
})

test("a level reached in one hyphenated word keeps that hyphen", () => {
  expect(saidIn(["work-tree", "one"], 1)).toBe("work-tree")
})

test("a level reached in one plain word is that word", () => {
  expect(saidIn(["held"], 1)).toBe("held")
})

test("a walk taking no word is spelled as nothing", () => {
  expect(saidIn([], 0)).toBe("")
})

test("the words reaching a level are each name above it, ending with its own", () => {
  expect(pathOf("track-session-open", NAMED)).toBe("track session open")
  expect(pathOf("track-session", NAMED)).toBe("track session")
  expect(pathOf("track", NAMED)).toBe("track")
})

test("a level whose own name carries a hyphen keeps that hyphen in one word", () => {
  const named: Naming = (slug) =>
    ({ "seat-compose-notices": "compose-notices", seat: "seat" })[slug] ?? null
  expect(pathOf("seat-compose-notices", named)).toBe("seat compose-notices")
})

test("a level stating no name is reached by what is left of its slug as one word", () => {
  expect(pathOf("work-tree", () => null)).toBe("work-tree")
  const named: Naming = (slug) => (slug === "a-b-c" ? "c" : null)
  expect(pathOf("a-b-c", named)).toBe("a-b c")
})

test("a level whose name is no ending of its slug is reached by that slug", () => {
  expect(pathOf("track-session", () => "elsewhere")).toBe("track-session")
})
