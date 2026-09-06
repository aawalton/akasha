import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Changing, Known } from "../../modules/warranting/warranting.module.code.ts"
import {
  addedIn,
  changeTabooTerms,
  foundIn,
  holdingBytes,
  judgedIn,
  owedOf,
  reachOf,
  seamsApart,
} from "./change-taboo-terms.context-warrant.code.ts"

const STAND = "(?<![a-z])(stands?|standing|stood)(?![a-z])"

const ROOT = join(import.meta.dir, "..", "..", "..")

const A_PICTURE_AT = "personas/amy/amy.persona.mobile-wallpaper.png"

const A_PORTRAIT_AT = "personas/amy/amy.persona.portrait.md"

const A_TERM = "the estate stands here"

const KNOWING = (): Known => ({ types: new Set<string>() })

function changingTo(said: string): Changing {
  const body = new TextEncoder().encode(said)
  return { changed: [], before: () => null, after: () => body }
}

test("what a change adds is the lines the body did not already hold", () => {
  expect(addedIn("one\ntwo", "one\ntwo\nthree")).toBe("three")
})

test("a body left unchanged adds nothing", () => {
  expect(addedIn("one\ntwo", "one\ntwo")).toBe("")
})

test("a file that was not there adds the whole of itself", () => {
  expect(addedIn("", "one\ntwo")).toBe("one\ntwo")
})

test("a line moved rather than written is not added", () => {
  expect(addedIn("one\ntwo", "two\none")).toBe("")
})

test("a line written twice where it was there once is added once", () => {
  expect(addedIn("one", "one\none")).toBe("one")
})

test("a pattern finds its term whatever the case", () => {
  expect(foundIn("\\bestate\\b", "the Estate stands")).toBe(true)
})

test("a pattern narrowed against a false positive does not find it", () => {
  expect(foundIn("(?<!\\.)\\bslice\\b", "next.slice(two)")).toBe(false)
  expect(foundIn("(?<!\\.)\\bslice\\b", "one slice judged")).toBe(true)
})

test("a pattern that does not compile finds nothing", () => {
  expect(foundIn("(unclosed", "anything at all")).toBe(false)
})

test("a seam opens between a lower letter or a digit and an upper one", () => {
  expect(seamsApart("dayStands")).toBe("day Stands")
  expect(seamsApart("utf8Body")).toBe("utf8 Body")
})

test("a seam opens where a run of upper letters gives way to a word", () => {
  expect(seamsApart("HTTPServer")).toBe("HTTP Server")
  expect(seamsApart("myHTTPServer")).toBe("my HTTP Server")
})

test("an underscore or a hyphen is left as it is", () => {
  expect(seamsApart("STANDING_ASIDE")).toBe("STANDING_ASIDE")
  expect(seamsApart("subagent-standing")).toBe("subagent-standing")
})

test("a term written as a word of its own is reached in the text itself", () => {
  for (const said of [
    "standing",
    "stands",
    "stood",
    "stand",
    "Standing",
    "STANDING_ASIDE",
    "STOOD_TOO_LONG",
    "TYPE_STANDS_AT",
    "NOT_STANDING",
    "subagent-standing",
    "stand-in",
    "a page stands here",
  ]) {
    expect([said, reachOf(STAND, said)]).toEqual([said, "written"])
  }
})

test("a term inside a camelCase name is reached at its seams", () => {
  for (const said of [
    "standingOf",
    "standInsIn",
    "dayStands",
    "everyStanding",
    "standsIn",
    "treesStanding",
    "worktreeStands",
    "shapeStanding",
    "ranAsStanding",
    "stoodUp",
    "testStandsBeside",
  ]) {
    expect([said, reachOf(STAND, said)]).toEqual([said, "seam"])
  }
})

test("a longer word merely holding the letters is reached neither way", () => {
  for (const said of [
    "standard",
    "understand",
    "understandsIt",
    "Standard",
    "STANDARD_START_FEN",
    "noStandardWay",
  ]) {
    expect([said, reachOf(STAND, said)]).toEqual([said, null])
  }
})

test("a pattern that does not compile is reached neither way", () => {
  expect(reachOf("(unclosed", "anything at all")).toBe(null)
})

test("what is owed names every sense and what is written instead", () => {
  const said = owedOf(
    [
      { sense: "a gated command", instead: "command" },
      { sense: "anything that refuses", instead: "written plainly" },
    ],
    [],
    "written"
  )
  expect(said).toContain("a gated command — write command instead")
  expect(said).toContain("anything that refuses — write written plainly instead")
})

test("what is owed for a seam says the term is inside a camelCase name", () => {
  const senses = [{ sense: "a gated command", instead: "command" }]
  expect(owedOf(senses, [], "seam")).toContain("inside a camelCase name")
  expect(owedOf(senses, [], "seam")).toContain("a gated command — write command instead")
  expect(owedOf(senses, [], "written")).not.toContain("camelCase")
})

test("what is owed for a term naming no kept sense names only the senses it bars", () => {
  const said = owedOf([{ sense: "a gated command", instead: "command" }], [], "written")
  expect(said).toBe(
    [
      "Your change writes a taboo term.",
      "  a gated command — write command instead",
      "Read what it bars, then judge for yourself whether you meant a sense it bars.",
    ].join("\n")
  )
})

test("what is owed names the senses a term keeps apart from the senses it bars", () => {
  const said = owedOf(
    [{ sense: "a gated command", instead: "command" }],
    ["the shape a zod validator names a value must have", "a rite of passage"],
    "seam"
  )
  expect(said).toContain("It is written in these senses")
  expect(said).toContain("  the shape a zod validator names a value must have")
  expect(said).toContain("  a rite of passage")
  expect(said).toContain("It bars these senses:")
  expect(said).toContain("  a gated command — write command instead")
  expect(said).toContain("inside a camelCase name")
  expect(said.indexOf("It is written in these senses")).toBeLessThan(
    said.indexOf("It bars these senses:")
  )
  expect(said).toContain("Match what you meant against the senses it keeps first")
})

test("a page of a type that runs no taboo check is not judged", () => {
  expect(judgedIn("akasha/story/worlds/pages/hyrule.world.ts", new Set(["world"]))).toBe(false)
})

test("a file beside such a page is not judged either", () => {
  const at = "akasha/story/worlds/pages/one/one.world.mechanic-readings.jsonl"
  expect(judgedIn(at, new Set(["world"]))).toBe(false)
})

test("a page type's own file is judged though its pages are not", () => {
  expect(judgedIn("akasha/story/worlds/world.page-type.ts", new Set(["world"]))).toBe(true)
})

test("a page of any other type is judged", () => {
  expect(judgedIn("akasha/story/worlds/pages/hyrule.world.ts", new Set<string>())).toBe(true)
  expect(judgedIn("akasha/alan/music/catalog/songs/pages/one.song.ts", new Set(["world"]))).toBe(
    true
  )
})

test("a path naming no page at all is judged", () => {
  expect(judgedIn("akasha/story/package.json", new Set(["world"]))).toBe(true)
})

test("a file whose property holds bytes is told from one whose property holds text", () => {
  expect(holdingBytes(ROOT, A_PICTURE_AT)).toBe(true)
  expect(holdingBytes(ROOT, A_PORTRAIT_AT)).toBe(false)
})

test("a page's own file holds no property, so nothing there holds bytes", () => {
  expect(holdingBytes(ROOT, "personas/amy/amy.persona.ts")).toBe(false)
})

test("a term written into a file whose property holds bytes warrants nothing", () => {
  expect(changeTabooTerms(ROOT, A_PICTURE_AT, KNOWING, changingTo(A_TERM))).toEqual([])
})

test("the same term written into a file whose property holds text warrants a reading", () => {
  const said = changeTabooTerms(ROOT, A_PORTRAIT_AT, KNOWING, changingTo(A_TERM))
  expect(said.length).toBeGreaterThan(0)
})
