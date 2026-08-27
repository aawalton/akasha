import { describe, expect, test } from "bun:test"
import {
  ASTRA_PAGES_PREFIX,
  ATHENA_AGENTS_PREFIX,
  AWEN_ENGINE_PREFIX,
  extensionsForPrefix,
  pathspecsForPrefix,
  pathspecsForPrefixes,
  resolvePointsPrefixes,
} from "./git-byte-pathspecs"

describe("extensionsForPrefix", () => {
  test("a book prefix meters markdown", () => {
    expect(extensionsForPrefix("packages/books/all-about-alan/")).toEqual(["md"])
  })

  test("Awen's engine prefix meters code (.ts/.tsx)", () => {
    expect(extensionsForPrefix(AWEN_ENGINE_PREFIX)).toEqual(["ts", "tsx"])
  })

  test("the engine prefix metering is independent of a trailing slash", () => {
    expect(extensionsForPrefix("packages/alanwalton/awen")).toEqual(["ts", "tsx"])
  })

  test("Astra's pages-substrate prefix meters code (.ts/.tsx) — the 2nd code persona", () => {
    expect(extensionsForPrefix(ASTRA_PAGES_PREFIX)).toEqual(["ts", "tsx"])
  })

  test("Astra's prefix metering is independent of a trailing slash", () => {
    expect(extensionsForPrefix("packages/shared/pages")).toEqual(["ts", "tsx"])
  })

  test("Athena's agents prefix meters code (.ts/.tsx) — the 3rd code member", () => {
    expect(extensionsForPrefix(ATHENA_AGENTS_PREFIX)).toEqual(["ts", "tsx"])
  })

  test("Athena's .claude/ prefix takes the markdown default (no map entry)", () => {
    expect(extensionsForPrefix(".claude/")).toEqual(["md"])
  })
})

describe("pathspecsForPrefixes", () => {
  test("a single string behaves exactly like pathspecsForPrefix", () => {
    expect(pathspecsForPrefixes("packages/books/")).toEqual(pathspecsForPrefix("packages/books/"))
  })

  test("a list yields the union of each prefix's pathspecs, in order", () => {
    expect(pathspecsForPrefixes([".claude/", ATHENA_AGENTS_PREFIX])).toEqual([
      ":(glob).claude/**/*.md",
      ":(glob).claude/*.md",
      ":(glob)packages/agents/**/*.ts",
      ":(glob)packages/agents/*.ts",
      ":(glob)packages/agents/**/*.tsx",
      ":(glob)packages/agents/*.tsx",
    ])
  })

  test("duplicate prefixes dedupe so no pathspec is scanned twice", () => {
    expect(pathspecsForPrefixes(["packages/books/", "packages/books"])).toEqual([
      ":(glob)packages/books/**/*.md",
      ":(glob)packages/books/*.md",
    ])
  })
})

describe("resolvePointsPrefixes", () => {
  test("a singular pointsPathPrefix resolves to a one-element list", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefix: "packages/books/my-faith/" })).toEqual([
      "packages/books/my-faith/",
    ])
  })

  test("an array-valued pointsPathPrefixes resolves as-is (the Athena shape)", () => {
    const prefixes = [".claude/", ATHENA_AGENTS_PREFIX]
    expect(resolvePointsPrefixes({ pointsPathPrefixes: prefixes })).toEqual(prefixes)
  })

  test("a non-empty plural wins over a singular when both are set", () => {
    expect(
      resolvePointsPrefixes({ pointsPathPrefix: "a/", pointsPathPrefixes: ["b/", "c/"] })
    ).toEqual(["b/", "c/"])
  })

  test("an empty plural falls back to the singular", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefix: "a/", pointsPathPrefixes: [] })).toEqual([
      "a/",
    ])
  })

  test("neither field resolves to the empty list (no git-byte points source)", () => {
    expect(resolvePointsPrefixes({})).toEqual([])
  })

  test.each([
    ["an empty singular", { pointsPathPrefix: "" }],
    ["a whitespace-only singular", { pointsPathPrefix: "   " }],
    ["a plural of nothing but empties", { pointsPathPrefixes: ["", "  "] }],
    ["both fields carrying nothing", { pointsPathPrefix: "", pointsPathPrefixes: [""] }],
  ])("%s resolves exactly as a missing key does", (_name, row) => {
    expect(resolvePointsPrefixes(row)).toEqual(resolvePointsPrefixes({}))
  })

  test("an empty entry is dropped from a plural without losing the real ones", () => {
    expect(resolvePointsPrefixes({ pointsPathPrefixes: ["", "a/", "  ", "b/"] })).toEqual([
      "a/",
      "b/",
    ])
  })

  test("a plural carrying nothing falls back to the singular", () => {
    expect(
      resolvePointsPrefixes({ pointsPathPrefix: "a/", pointsPathPrefixes: ["", "  "] })
    ).toEqual(["a/"])
  })
})

describe("pathspecsForPrefix", () => {
  test("a markdown prefix yields the two nested+top-level *.md globs (book-points-source shape)", () => {
    expect(pathspecsForPrefix("packages/books/")).toEqual([
      ":(glob)packages/books/**/*.md",
      ":(glob)packages/books/*.md",
    ])
  })

  test("normalizes a prefix without a trailing slash", () => {
    expect(pathspecsForPrefix("packages/books")).toEqual([
      ":(glob)packages/books/**/*.md",
      ":(glob)packages/books/*.md",
    ])
  })

  test("Awen's engine prefix yields *.ts and *.tsx globs, not *.md", () => {
    expect(pathspecsForPrefix(AWEN_ENGINE_PREFIX)).toEqual([
      ":(glob)packages/alanwalton/awen/**/*.ts",
      ":(glob)packages/alanwalton/awen/*.ts",
      ":(glob)packages/alanwalton/awen/**/*.tsx",
      ":(glob)packages/alanwalton/awen/*.tsx",
    ])
  })

  test("Astra's pages-substrate prefix yields *.ts and *.tsx globs, not *.md", () => {
    expect(pathspecsForPrefix(ASTRA_PAGES_PREFIX)).toEqual([
      ":(glob)packages/shared/pages/**/*.ts",
      ":(glob)packages/shared/pages/*.ts",
      ":(glob)packages/shared/pages/**/*.tsx",
      ":(glob)packages/shared/pages/*.tsx",
    ])
  })
})
