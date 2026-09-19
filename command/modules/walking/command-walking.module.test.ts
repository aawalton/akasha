import { expect, test } from "bun:test"
import { command } from "akasha/command/command.page-type.ts"
import {
  type Level,
  type Naming,
  type Parting,
  pathOf,
  saidIn,
  walkingIn,
  wordsIn,
} from "akasha/command/modules/walking/command-walking.module.code.ts"
import { namespace } from "akasha/command/namespace/namespace.page-type.ts"
import { trackSessionOpen } from "akasha/command/pages/track/session/open/track-session-open.command.ts"
import { trackSession } from "akasha/command/pages/track/session/track-session.namespace.ts"
import { track } from "akasha/command/pages/track/track.namespace.ts"

const TRACK_AT = `${namespace.slug}/${track.slug}` as const

const TRACK_SESSION_AT = `${namespace.slug}/${trackSession.slug}` as const

const TRACK_SESSION_OPEN_AT = `${command.slug}/${trackSessionOpen.slug}` as const

const NAMED: Naming = (slug) =>
  ({ "track-session-open": "open", "track-session": "session", track: "track" })[slug] ?? null

function level(type: string, slug: string, named: string, parts: readonly string[] = []): Level {
  return { named, slug, type, path: `${slug}.${type}.ts`, parts }
}

const TREE: Readonly<Record<string, Level>> = {
  [TRACK_AT]: level("namespace", "track", "track", [TRACK_SESSION_AT]),
  [TRACK_SESSION_AT]: level("namespace", "track-session", "session", [TRACK_SESSION_OPEN_AT]),
  [TRACK_SESSION_OPEN_AT]: level("command", "track-session-open", "open"),
  "command/work-tree": level("command", "work-tree", "work-tree"),
}

const ROOT = [TRACK_AT, "command/work-tree", "module/held"]

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

test("the levels stepped through to reach a level are carried with it, widest first", () => {
  const said = walkingIn(ROOT, ["track", "session", "open"], UNDER)
  expect(said?.above.map((one) => one.slug)).toEqual(["track", "track-session"])
})

test("a level reached by the first word is carried with no level above it", () => {
  expect(walkingIn(ROOT, ["work-tree"], UNDER)?.above).toEqual([])
})

test("a descent ending early carries the levels above the level it ended at", () => {
  const said = walkingIn(ROOT, ["track", "session", "shut"], UNDER)
  expect(said?.found[0]?.slug).toBe("track-session")
  expect(said?.above.map((one) => one.slug)).toEqual(["track"])
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

test("a word naming more than one part ends the walk and steps into none of them", () => {
  const twins: Readonly<Record<string, Level>> = {
    "namespace/pick": level("namespace", "pick", "pick", [
      "command/pick-first",
      "command/pick-second",
    ]),
    "command/pick-first": level("command", "pick-first", "twin", ["command/pick-first-near"]),
    "command/pick-second": level("command", "pick-second", "twin", ["command/pick-second-far"]),
    "command/pick-first-near": level("command", "pick-first-near", "near"),
    "command/pick-second-far": level("command", "pick-second-far", "far"),
  }
  const among: Parting = (part) => {
    const one = twins[part]
    return one === undefined ? [] : [one]
  }
  const both = ["pick-first", "pick-second"]
  const twin = walkingIn(["namespace/pick"], ["pick", "twin"], among)
  expect(twin?.found.map((one) => one.slug)).toEqual(both)
  const near = walkingIn(["namespace/pick"], ["pick", "twin", "near"], among)
  expect(near?.held).toBe(2)
  expect(near?.found.map((one) => one.slug)).toEqual(both)
  expect(near?.above.map((one) => one.slug)).toEqual(["pick"])
  const far = walkingIn(["namespace/pick"], ["pick", "twin", "far"], among)
  expect(far?.held).toBe(2)
  expect(far?.found.map((one) => one.slug)).toEqual(both)
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
    ({ "seat-notice-list": "notice-list", seat: "seat" })[slug] ?? null
  expect(pathOf("seat-notice-list", named)).toBe("seat notice-list")
})

test("a level stating no name is reached by what is left of its slug as one word", () => {
  expect(pathOf("work-tree", () => null)).toBe("work-tree")
  const named: Naming = (slug) => (slug === "a-b-c" ? "c" : null)
  expect(pathOf("a-b-c", named)).toBe("a-b c")
})

test("a level whose name is no ending of its slug is reached by that slug", () => {
  expect(pathOf("track-session", () => "elsewhere")).toBe("track-session")
})
