import { expect, test } from "bun:test"
import {
  messageOf,
  rowsOf,
  taken,
  typedOver,
} from "akasha/command/pages/music/type-tracks/music-type-tracks.command.code.ts"

const CALLED_AS = "akasha music type-tracks"

test("a track whose kind would change is written", () => {
  const held = typedOver({ slug: "one", title: "Bang Bang - A Cappella" }, "Bang Bang - A Cappella")
  expect(held).toMatchObject({ trackType: "a-cappella" })
})

test("a track already stating that kind is left", () => {
  const was = { slug: "one", title: "Fire and Ice", trackType: "studio" }
  expect(typedOver(was, "Fire and Ice")).toBeNull()
})

test("a track stating another kind is restated", () => {
  const was = { slug: "one", title: "Bang Bang - Instrumental", trackType: "studio" }
  expect(typedOver(was, "Bang Bang - Instrumental")).toMatchObject({ trackType: "instrumental" })
})

test("a limit of nought is refused rather than read as no limit", () => {
  const held = taken(["--limit", "0"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("one or more")
})

test("a flag this takes nothing of is refused", () => {
  const held = taken(["--today", "2026-01-01"], CALLED_AS)
  expect("refused" in held && held.refused).toContain("`--today` is no argument")
})

test("what was done is said as rows and as a message", () => {
  expect(rowsOf({ tracks: 10, typed: 3, left: 2 })).toEqual(["tracks\t10", "typed\t3", "left\t2"])
  expect(messageOf({ tracks: 10, typed: 3, left: 2 })).toBe(
    "state the kind of recording on 3 track(s)"
  )
})
