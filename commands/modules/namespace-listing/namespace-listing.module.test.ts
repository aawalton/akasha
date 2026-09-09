import { expect, test } from "bun:test"
import {
  type Held,
  listingOf,
  partsOf,
  slugOfPart,
  spaced,
  underOf,
} from "./namespace-listing.module.code.ts"

const HELP = "--help"

test("the parts a page names are read off it, and anything else is not", () => {
  expect(partsOf({ parts: ["command/a", "namespace/b"] })).toEqual(["command/a", "namespace/b"])
  expect(partsOf({ parts: ["command/a", 1, null] })).toEqual(["command/a"])
  expect(partsOf({ parts: "command/a" })).toEqual([])
  expect(partsOf({})).toEqual([])
  expect(partsOf(null)).toEqual([])
})

test("the page type a part names is dropped", () => {
  expect(slugOfPart("command/track-session-open")).toBe("track-session-open")
  expect(slugOfPart("track-session-open")).toBe("track-session-open")
})

test("a part is named by the words past the namespace holding it", () => {
  expect(underOf("track", "command/track-health-import")).toBe("health-import")
  expect(underOf("track-session", "command/track-session-open")).toBe("open")
  expect(underOf("track", "namespace/track-session")).toBe("session")
})

test("a part opening with another name than its namespace's is named nowhere", () => {
  expect(underOf("track", "command/music-play")).toBe(null)
  expect(underOf("track", "command/track")).toBe(null)
  expect(underOf("track", "command/tracking")).toBe(null)
})

test("a hyphen between two words of a slug is written as a space", () => {
  expect(spaced("health-import")).toBe("health import")
  expect(spaced("open")).toBe("open")
})

const HELD: readonly Held[] = [
  { named: "akasha track session open", said: "open one" },
  { named: "akasha track session log", said: null },
]

test("the parts are written down under the namespace, padded so the definitions line up", () => {
  const said = listingOf("akasha track session", "the stretches", HELD, HELP)
  expect(said?.[0]).toBe("akasha track session — the stretches")
  expect(said?.[1]).toBe("")
  expect(said?.[2]).toBe("  akasha track session open  open one")
  expect(said?.[3]).toBe("  akasha track session log")
  expect(said?.[5]).toBe("say `akasha track session <command> --help` for what one takes")
})

test("a namespace stating no definition is written down by name alone", () => {
  expect(listingOf("akasha track session", null, HELD, HELP)?.[0]).toBe("akasha track session")
})

test("a namespace holding no part is written down as nothing", () => {
  expect(listingOf("akasha track session", "the stretches", [], HELP)).toBe(null)
})
