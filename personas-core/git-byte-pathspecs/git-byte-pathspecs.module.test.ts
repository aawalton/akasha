import { describe, expect, test } from "bun:test"
import {
  ATHENA_AGENTS_PREFIX,
  AWEN_ENGINE_PREFIX,
  extensionsForPrefix,
  pathspecsForPrefix,
  pathspecsForPrefixes,
  resolvePointsPrefixes,
} from "./git-byte-pathspecs.module.code.ts"

describe("extensionsForPrefix", () => {
  test("counts code under a prefix it knows", () => {
    expect(extensionsForPrefix(AWEN_ENGINE_PREFIX)).toEqual(["ts", "tsx"])
  })

  test("counts markdown under a prefix nobody named", () => {
    expect(extensionsForPrefix("stories/tower/")).toEqual(["md"])
  })

  test("reads a prefix with and without its trailing slash the same way", () => {
    expect(extensionsForPrefix("packages/agents")).toEqual(
      extensionsForPrefix(ATHENA_AGENTS_PREFIX)
    )
  })
})

describe("pathspecsForPrefix", () => {
  test("asks for a folder and its descendants for each extension", () => {
    expect(pathspecsForPrefix("stories/tower/")).toEqual([
      ":(glob)stories/tower/**/*.md",
      ":(glob)stories/tower/*.md",
    ])
  })

  test("asks for both code extensions under a code prefix", () => {
    expect(pathspecsForPrefix(ATHENA_AGENTS_PREFIX).length).toBe(4)
  })
})

describe("pathspecsForPrefixes", () => {
  test("lists a pathspec two prefixes both ask for once", () => {
    expect(pathspecsForPrefixes(["stories/tower", "stories/tower/"])).toEqual([
      ":(glob)stories/tower/**/*.md",
      ":(glob)stories/tower/*.md",
    ])
  })

  test("takes one prefix written on its own", () => {
    expect(pathspecsForPrefixes("stories/tower")).toEqual(pathspecsForPrefixes(["stories/tower"]))
  })
})

describe("resolvePointsPrefixes", () => {
  test("prefers the many over the one", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefixes: ["a"], pointsPathPrefix: "b" })).toEqual([
      "a",
    ])
  })

  test("passes over a blank entry among the many", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefixes: ["a", "  "] })).toEqual(["a"])
  })

  test("falls back to the one where the many are all blank", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefixes: ["  "], pointsPathPrefix: "b" })).toEqual([
      "b",
    ])
  })

  test("answers nothing where a row names no prefix", () => {
    expect(resolvePointsPrefixes({})).toEqual([])
  })

  test("answers nothing for a blank one", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefix: "   " })).toEqual([])
  })
})
