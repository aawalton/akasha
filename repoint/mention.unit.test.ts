import { describe, expect, test } from "bun:test"
import type { Roots } from "../page/page.ts"
import { type Fixture, fixture, rootsAt } from "./fixture.ts"
import { escapedSpellings, mentionsOf } from "./mention.ts"
import { surveyRename } from "./repoint.ts"

const MOVE = new Map([["roles/reviewer.md", "roles/instructions-reviewer.md"]])

const NOWHERE: Roots = { akasha: "/nonexistent-akasha", "code-editor": "/nonexistent-code-editor" }

function spellings(at: Fixture): void {
  at.put("roles/reviewer.md", "# Reviewer\n")
  at.put(
    "a.test.ts",
    [
      'const plain = "roles/reviewer.md"',
      "rmSync(`${at.root}/roles/reviewer.md`, { force: true })",
      "const other = `${at.root}/vendor/roles/reviewer.md`",
      "expect(line).toMatch(/^4\\. NEVER READ — `roles\\/reviewer\\.md`/)",
      "const built = `roles/${slug}.md`",
      "",
    ].join("\n")
  )
}

describe("mentionsOf", () => {
  test("carries the line the occurrence sits on, which is what a removal reports it by", () => {
    const body = ["const HELP = `", "  bun tools/rm.ts <path>", "`", ""].join("\n")
    const found = mentionsOf(body, ["tools/rm.ts"], NOWHERE)
    expect(found).toHaveLength(1)
    expect(found[0]?.line).toBe(2)
  })

  test("resolves its prefix against the addressed root rather than another repository's", () => {
    const body = "the project is at /nonexistent-code-editor/projects/1.md today\n"
    expect(mentionsOf(body, ["projects/1.md"], { ...NOWHERE, target: "code-editor" })).toHaveLength(1)
    expect(mentionsOf(body, ["projects/1.md"], { ...NOWHERE, target: "akasha" })).toEqual([])
  })
})

describe("mentionPatches", () => {
  test("follows a path a substitution opens, and leaves one that names another repo", () => {
    const at = fixture()
    try {
      spellings(at)
      const survey = surveyRename(MOVE, rootsAt(at.root))
      const body = survey.entries.find((e) => e.relPath === "a.test.ts")?.body ?? ""
      expect(body).toContain('const plain = "roles/instructions-reviewer.md"')
      expect(body).toContain("`${at.root}/roles/instructions-reviewer.md`")
      expect(body).toContain("`${at.root}/vendor/roles/reviewer.md`")
      expect(body).toContain("`roles/${slug}.md`")
    } finally {
      at.dispose()
    }
  })
})

describe("escapedMentions", () => {
  test("reports an escaped spelling with its line and leaves it byte-for-byte", () => {
    const at = fixture()
    try {
      spellings(at)
      const survey = surveyRename(MOVE, rootsAt(at.root))
      expect(survey.escaped).toHaveLength(1)
      expect(survey.escaped[0]).toContain("a.test.ts:4")
      expect(survey.escaped[0]).toContain("roles\\/reviewer\\.md")
      const body = survey.entries.find((e) => e.relPath === "a.test.ts")?.body ?? ""
      expect(body).toContain("/^4\\. NEVER READ — `roles\\/reviewer\\.md`/")
    } finally {
      at.dispose()
    }
  })

  test("does not report a plain mention the rewriting pass deliberately left", () => {
    const at = fixture()
    try {
      at.put("roles/reviewer.md", "# Reviewer\n")
      at.put("a.test.ts", "const a = 'vendor/roles/reviewer.md'\nconst b = 'roles/reviewer.mdx'\n")
      expect(surveyRename(MOVE, rootsAt(at.root)).escaped).toEqual([])
    } finally {
      at.dispose()
    }
  })

  test("says nothing about quarantine, which holds no veto over the live documents", () => {
    const at = fixture()
    try {
      at.put("roles/reviewer.md", "# Reviewer\n")
      at.put("dirty/old.md", "It matches `roles\\/reviewer\\.md` and always did.\n")
      expect(surveyRename(MOVE, rootsAt(at.root)).escaped).toEqual([])
    } finally {
      at.dispose()
    }
  })

  test.todo("catches a moved path at a regex literal's first character, which the boundary class reads as a path separator", () => {
    const at = fixture()
    try {
      at.put("roles/reviewer.md", "# Reviewer\n")
      at.put("a.test.ts", "const re = /roles\\/reviewer\\.md/\n")
      expect(surveyRename(MOVE, rootsAt(at.root)).escaped).toHaveLength(1)
    } finally {
      at.dispose()
    }
  })

  test.todo("catches one a regex literal's closing delimiter ends, which the same class reads as a path separator", () => {
    const at = fixture()
    try {
      at.put("roles/reviewer.md", "# Reviewer\n")
      at.put("a.test.ts", "const re = /(x)roles\\/reviewer\\.md/\n")
      expect(surveyRename(MOVE, rootsAt(at.root)).escaped).toHaveLength(1)
    } finally {
      at.dispose()
    }
  })
})

describe("escapedSpellings", () => {
  test("refuses rather than advises, and says what to do instead", () => {
    expect(escapedSpellings([]).verdict).toBe("pass")
    const outcome = escapedSpellings(["a.test.ts:4: `roles\\/reviewer\\.md`"])
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("a.test.ts:4")
    expect(outcome.messages.join("\n")).toContain("BEFORE the move")
  })
})
