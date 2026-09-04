import { expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { ARTIST, SONG, saidOf, taken, valuesFor } from "./music-rate.command.code.ts"

const scratch = scratchWorld()

function refusalOf(argv: readonly string[]): string {
  const held = taken(argv)
  if (!("refused" in held)) throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  return held.refused
}

function takingOf(argv: readonly string[]) {
  const held = taken(argv)
  if ("refused" in held) throw new Error(`\`${argv.join(" ")}\` was refused — ${held.refused}`)
  return held
}

test("a flag this takes nothing of is refused", () => {
  expect(refusalOf(["--id", "abc"])).toContain("`--id` is nothing this takes")
})

test("a target that is neither an artist nor a song is refused", () => {
  expect(refusalOf(["--target", "album", "--slug", "a", "--rating", "A"])).toContain("`album`")
})

test("a call naming no slug is refused", () => {
  expect(refusalOf(["--target", SONG, "--rating", "A"])).toContain("`--slug`")
})

test("a rating off the ladder is refused", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a", "--rating", "A++"])).toContain("`A++`")
})

test("insights named for an artist are refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "a", "--insights", "x"])
  expect(said).toContain("`--insights`")
  expect(said).toContain(`--target ${SONG}`)
})

test("a reaction named for a song is refused", () => {
  const said = refusalOf(["--target", SONG, "--slug", "a", "--reaction", "x"])
  expect(said).toContain("`--reaction`")
  expect(said).toContain(`--target ${ARTIST}`)
})

test("a call recording nothing is refused", () => {
  expect(refusalOf(["--target", SONG, "--slug", "a"])).toContain("nothing is recorded")
})

test("a value and its file together are refused", () => {
  const said = refusalOf([
    "--target",
    SONG,
    "--slug",
    "a",
    "--insights",
    "x",
    "--insights-file",
    "y",
  ])
  expect(said).toContain("both are given")
})

test("a flag named twice is refused", () => {
  expect(refusalOf(["--target", SONG, "--target", ARTIST])).toContain("named twice")
})

test("a rating and prose are taken together", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--rating",
    "S+",
    "--insights",
    "it turns at the bridge",
    "--json",
  ])
  expect(held.target).toBe(SONG)
  expect(held.slug).toBe("mitski-nobody")
  expect(held.rating).toBe("S+")
  expect(held.prose.get("insights")).toBe("it turns at the bridge")
  expect(held.json).toBe(true)
})

test("prose is read off the file its flag names", () => {
  const root = scratch.rootFor("music-rate-prose-")
  const at = join(root, "reaction.md")
  writeFileSync(at, "she sings it plainly\n")
  const held = takingOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", at])
  expect(held.prose.get("reaction")).toBe("she sings it plainly\n")
  expect(held.rating).toBe(null)
  scratch.sweep()
})

test("a file that is not there is refused", () => {
  const said = refusalOf(["--target", ARTIST, "--slug", "mitski", "--reaction-file", "/nowhere/x"])
  expect(said).toContain("could not be read as text")
})

test("the values carry the rating and mark the prose beside the page", () => {
  const held = takingOf([
    "--target",
    SONG,
    "--slug",
    "mitski-nobody",
    "--rating",
    "A",
    "--personal-connections",
    "the drive home",
  ])
  const values = valuesFor({ slug: "mitski-nobody", title: "Nobody" }, held)
  expect(values["title"]).toBe("Nobody")
  expect(values["rank"]).toBe("A")
  expect(values["personalConnections"]).toBe("txt")
})

test("what is recorded is said as a line or as JSON", () => {
  const held = takingOf(["--target", SONG, "--slug", "a", "--rating", "B"])
  expect(saidOf(held)).toBe(`Recorded ${SONG} a`)
  const asJson = takingOf(["--target", SONG, "--slug", "a", "--rating", "B", "--json"])
  expect(JSON.parse(saidOf(asJson))).toEqual({ target: SONG, slug: "a", rating: "B" })
})
