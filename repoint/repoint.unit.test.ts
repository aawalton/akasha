import { describe, expect, test } from "bun:test"
import { fixture, landed, rootsAt } from "./fixture.ts"
import { mentionsOf } from "./mention.ts"
import { type Moves, specifierReading, surveyRename } from "./repoint.ts"

function moves(...pairs: readonly (readonly [string, string])[]): Moves {
  return new Map(pairs)
}

describe("what a rename repoints", () => {
  test("an inbound link is followed to the new path, spelled from the referrer", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("docs/y.md", "# Y\n\nBack to [x](x.md).\n")
      const body = landed(at.root, moves(["docs/x.md", "folders/x.md"]), "docs/y.md")
      expect(body).toContain("[x](../folders/x.md)")
    } finally {
      at.dispose()
    }
  })

  test("a moved file's own relative links are re-anchored to where it now sits", () => {
    const at = fixture()
    try {
      at.put("schemas/thing.md", "# Thing\n")
      at.put("docs/x.md", "# X\n\nIt names [thing](../schemas/thing.md) and [y](y.md).\n")
      at.put("docs/y.md", "# Y\n")
      const body = landed(at.root, moves(["docs/x.md", "tools/deep/x.md"]), "tools/deep/x.md")
      expect(body).toContain("[thing](../../schemas/thing.md)")
      expect(body).toContain("[y](../../docs/y.md)")
    } finally {
      at.dispose()
    }
  })

  test("a path written as text is repointed, which is what no link check reaches", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("tools/note.ts", "/** Routed from docs/x.md. */\nexport const note = 1\n")
      const body = landed(at.root, moves(["docs/x.md", "folders/x.md"]), "tools/note.ts")
      expect(body).toContain("Routed from folders/x.md.")
    } finally {
      at.dispose()
    }
  })

  test("a root-absolute spelling is repointed and one naming another repo is not", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("notes.md", `# Notes\n\nRun ${at.root}/docs/x.md, never /elsewhere/docs/x.md.\n`)
      const body = landed(at.root, moves(["docs/x.md", "folders/x.md"]), "notes.md")
      expect(body).toContain(`${at.root}/folders/x.md`)
      expect(body).toContain("/elsewhere/docs/x.md")
    } finally {
      at.dispose()
    }
  })

  test("a path that merely ENDS with a moved one is left alone", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("notes.md", "# Notes\n\nNot `vendor/docs/x.md`, which is another repo's.\n")
      expect(landed(at.root, moves(["docs/x.md", "docs/y.md"]), "notes.md")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("a relative link inside a fence is left as written, being an example of a spelling", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("folders/guide.md", "# Guide\n\n```\n[x](../docs/x.md)\n```\n")
      expect(landed(at.root, moves(["docs/x.md", "folders/x.md"]), "folders/guide.md")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("a root-relative path inside a fence IS repointed, so a usage line cannot go stale", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("guide.md", "# Guide\n\n```\nbun tools/rm.ts docs/x.md\n```\n")
      const body = landed(at.root, moves(["docs/x.md", "folders/x.md"]), "guide.md")
      expect(body).toContain("bun tools/rm.ts folders/x.md")
    } finally {
      at.dispose()
    }
  })

  test("a relative module specifier follows the module it names", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one.ts"\nexport const two = one\n')
      const body = landed(at.root, moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"]), "tools/two.ts")
      expect(body).toContain('from "./lib/deep/one.ts"')
    } finally {
      at.dispose()
    }
  })

  test("a moved module's own specifiers stay explicitly relative from its new directory", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one.ts"\nexport const two = one\n')
      const body = landed(at.root, moves(["tools/two.ts", "tools/lib/two.ts"]), "tools/lib/two.ts")
      expect(body).toContain('from "./one.ts"')
    } finally {
      at.dispose()
    }
  })

  test("an extensionless specifier follows the module it names, and stays extensionless", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one"\nexport const two = one\n')
      const body = landed(at.root, moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"]), "tools/two.ts")
      expect(body).toContain('from "./lib/deep/one"')
    } finally {
      at.dispose()
    }
  })

  test("a `.js` specifier resolving to a `.ts` file follows it, still spelled `.js`", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one.js"\nexport const two = one\n')
      const body = landed(at.root, moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"]), "tools/two.ts")
      expect(body).toContain('from "./lib/deep/one.js"')
    } finally {
      at.dispose()
    }
  })

  test("a directory specifier resolving to `index.ts` follows the file out of that directory", () => {
    const at = fixture()
    try {
      at.put("tools/lib/index.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib"\nexport const two = one\n')
      const body = landed(at.root, moves(["tools/lib/index.ts", "tools/lib/one.ts"]), "tools/two.ts")
      expect(body).toContain('from "./lib/one"')
    } finally {
      at.dispose()
    }
  })

  test("a specifier whose name merely holds a moved one is left alone", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/lib/one-more.ts", "export const more = 2\n")
      at.put("tools/lib/the-one.ts", "export const the = 3\n")
      at.put(
        "tools/two.ts",
        'import { more } from "./lib/one-more"\nimport { the } from "./lib/the-one"\nexport const two = more + the\n'
      )
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      expect(landed(at.root, pairs, "tools/two.ts")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("a specifier naming a same-named file in another directory is left alone", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/other/one.ts", "export const one = 2\n")
      at.put("tools/two.ts", 'import { one } from "./other/one"\nexport const two = one\n')
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      expect(landed(at.root, pairs, "tools/two.ts")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("the survey states the specifiers it read, not only the ones it changed", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one"\nexport const two = one\n')
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      const { reading } = surveyRename(pairs, rootsAt(at.root))
      expect(reading).toEqual({ moving: 1, files: 2, specifiers: 1, repointed: 1, unreached: [] })
    } finally {
      at.dispose()
    }
  })

  test("a move that repoints nothing states the population it read rather than staying silent", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", "export const two = 2\n")
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      const outcome = specifierReading(surveyRename(pairs, rootsAt(at.root)).reading)
      expect(outcome.verdict).toBe("pass")
      expect(outcome.population).toEqual({ measured: 0, unit: "relative specifier(s)" })
      expect(outcome.detail).toContain("0 repointed across 2 TypeScript file(s)")
    } finally {
      at.dispose()
    }
  })

  test("a moved TypeScript file the survey never read is refused, not carried off unrepointed", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", `export const one = 1\n${String.fromCharCode(0)}\n`)
      at.put("tools/two.ts", 'import { one } from "./lib/one"\nexport const two = one\n')
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      const { reading } = surveyRename(pairs, rootsAt(at.root))
      expect(reading.unreached).toEqual(["tools/lib/one.ts"])
      expect(specifierReading(reading).verdict).toBe("fail")
    } finally {
      at.dispose()
    }
  })

  test("a moved file is carried even where nothing in it changed", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      const survey = surveyRename(moves(["docs/x.md", "folders/x.md"]), rootsAt(at.root))
      expect(survey.entries).toHaveLength(1)
      expect(survey.entries[0]?.relPath).toBe("folders/x.md")
      expect(survey.entries[0]?.body).toBe("# X\n")
    } finally {
      at.dispose()
    }
  })

  test("a reference out of quarantine is reported and never rewritten", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("dirty/old.md", "# Old\n\nIt names [x](../docs/x.md).\n")
      const survey = surveyRename(moves(["docs/x.md", "folders/x.md"]), rootsAt(at.root))
      expect(survey.entries.map((e) => e.relPath)).toEqual(["folders/x.md"])
      expect(survey.quarantined[0]).toContain("dirty/old.md:3")
    } finally {
      at.dispose()
    }
  })

  test("a link into a subdirectory of the referrer's own directory is spelled `./`", () => {
    const at = fixture()
    try {
      at.put("kinds/x.md", "# X\n")
      at.put("docs/sibling.md", "# Sibling\n")
      at.put("docs/parent.md", "# Parent\n\nIt names [x](../kinds/x.md) and [sibling](sibling.md).\n")
      const body = landed(at.root, moves(["kinds/x.md", "docs/kinds/x.md"]), "docs/parent.md")
      expect(body).toContain("[x](./kinds/x.md)")
      expect(mentionsOf(body ?? "", ["kinds/x.md"], rootsAt(at.root))).toHaveLength(0)
      expect(body).toContain("[sibling](sibling.md)")
    } finally {
      at.dispose()
    }
  })

  test("every rewrite is reported with the line it sits on", () => {
    const at = fixture()
    try {
      at.put("docs/x.md", "# X\n")
      at.put("docs/y.md", "# Y\n\nBack to [x](x.md).\n")
      const survey = surveyRename(moves(["docs/x.md", "folders/x.md"]), rootsAt(at.root))
      const notes = survey.entries.find((e) => e.relPath === "docs/y.md")?.notes ?? []
      expect(notes[0]).toContain("3:")
      expect(notes[0]).toContain("../folders/x.md")
    } finally {
      at.dispose()
    }
  })

  test("a specifier naming what no repository holds is left as written", () => {
    const at = fixture()
    try {
      const body = 'import type { Route } from "./+types/sign-out"\n'
      at.put("app/routes/sign-out.ts", body)
      const pairs = moves(["app/routes/sign-out.ts", "deep/nest/sign-out.ts"])
      expect(landed(at.root, pairs, "deep/nest/sign-out.ts")).toBe(body)
    } finally {
      at.dispose()
    }
  })

  test("a specifier naming a file that stays put is re-spelled from the mover's new home", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put("tools/two.ts", 'import { one } from "./lib/one.ts"\nexport const two = one\n')
      const pairs = moves(["tools/two.ts", "deep/two.ts"])
      expect(landed(at.root, pairs, "deep/two.ts")).toContain('from "../tools/lib/one.ts"')
    } finally {
      at.dispose()
    }
  })
})
