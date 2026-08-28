import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, relative, resolve } from "node:path"
import type { Roots } from "../page/page.ts"
import { targetRepo } from "../repo/roots/roots.ts"
import { fixture, rootsAt } from "./fixture.ts"
import { type Moves, surveyImporters, surveyRename } from "./repoint.ts"

function moves(...pairs: readonly (readonly [string, string])[]): Moves {
  return new Map(pairs)
}

describe("a move that crosses a repository boundary", () => {
  const twoRepos = (source: string, destination: string): { source: Roots; destination: Roots } => {
    const both = { ...rootsAt(source), "code-editor": destination }
    return {
      source: { ...both, target: "akasha" },
      destination: { ...both, target: "code-editor" },
    }
  }

  const hrefIn = (body: string | undefined, label: string): string => {
    const found = new RegExp(`\\[${label}\\]\\(([^)]+)\\)`).exec(body ?? "")
    return found?.[1] ?? ""
  }

  test("a moved body lands under the destination root, its own link still reaching what stayed", () => {
    const from = fixture()
    const to = fixture()
    try {
      from.put("schemas/thing.md", "# Thing\n")
      from.put("docs/x.md", "# X\n\nIt names [thing](../schemas/thing.md).\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["docs/x.md", "pages/x.md"]), at.source, at.destination)
      const entry = survey.entries.find((e) => e.relPath === "pages/x.md")
      expect(entry?.moved).toBe(true)
      expect(resolve(`${to.root}/pages`, hrefIn(entry?.body, "thing"))).toBe(
        `${from.root}/schemas/thing.md`
      )
    } finally {
      to.dispose()
      from.dispose()
    }
  })

  test("a referrer that stays behind is not carried, and its link reaches the other repo", () => {
    const from = fixture()
    const to = fixture()
    try {
      from.put("docs/x.md", "# X\n")
      from.put("docs/y.md", "# Y\n\nBack to [x](x.md).\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["docs/x.md", "pages/x.md"]), at.source, at.destination)
      const entry = survey.entries.find((e) => e.relPath === "docs/y.md")
      expect(entry?.moved).toBe(false)
      expect(resolve(`${from.root}/domains`, hrefIn(entry?.body, "x"))).toBe(`${to.root}/pages/x.md`)
    } finally {
      to.dispose()
      from.dispose()
    }
  })

  test("a body landing on the relative path it left is a move, the repository being what differs", () => {
    const from = fixture()
    const to = fixture()
    try {
      from.put("schemas/thing.md", "# Thing\n")
      from.put("pages/a.md", "# A\n\nIt names [thing](../schemas/thing.md).\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["pages/a.md", "pages/a.md"]), at.source, at.destination)
      const entry = survey.entries.find((e) => e.relPath === "pages/a.md")
      expect(entry?.moved).toBe(true)
      expect(resolve(`${to.root}/pages`, hrefIn(entry?.body, "thing"))).toBe(
        `${from.root}/schemas/thing.md`
      )
    } finally {
      to.dispose()
      from.dispose()
    }
  })

  test("a file the call never names is not carried across, whatever root the bodies land under", () => {
    const from = fixture()
    const to = fixture()
    try {
      from.put("pages/a.md", "# A\n")
      from.put("pages/stays.md", "# Stays\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["pages/a.md", "pages/a.md"]), at.source, at.destination)
      expect(survey.entries.filter((e) => e.moved).map((e) => e.relPath)).toEqual(["pages/a.md"])
    } finally {
      to.dispose()
      from.dispose()
    }
  })

  test("a destination matching the source in both path and repository is no move at all", () => {
    const only = fixture()
    try {
      only.put("pages/a.md", "# A\n")
      const survey = surveyRename(moves(["pages/a.md", "pages/a.md"]), rootsAt(only.root))
      expect(survey.entries.some((e) => e.moved)).toBe(false)
    } finally {
      only.dispose()
    }
  })
})

describe("a repository that neither gives a body up nor takes one", () => {
  const repoAt = (prefix: string): string => {
    const at = mkdtempSync(`${tmpdir()}/${prefix}`)
    Bun.spawnSync({ cmd: ["git", "init", "-q", "-b", "main", "."], cwd: at })
    return at
  }

  const tracked = (root: string, relPath: string, body: string): void => {
    mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
    writeFileSync(`${root}/${relPath}`, body)
    Bun.spawnSync({ cmd: ["git", "add", "--", relPath], cwd: root })
  }

  const withBoth = (work: (source: string, bystander: string) => void): void => {
    const source = repoAt("renamesource-")
    const bystander = repoAt("renamenames-")
    try {
      work(source, bystander)
    } finally {
      rmSync(source, { recursive: true, force: true })
      rmSync(bystander, { recursive: true, force: true })
    }
  }

  const specifierIn = (body: string): string => /from "([^"]+)"/.exec(body)?.[1] ?? ""

  test("its importer is repointed, and stands as a landing in its own repository", () => {
    withBoth((source, bystander) => {
      tracked(source, "tools/one.ts", "export const one = 1\n")
      const spelling = relative(`${bystander}/src`, `${source}/tools/one.ts`)
      tracked(bystander, "src/uses.ts", `import { one } from "${spelling}"\nexport const uses = one\n`)
      const at = { ...rootsAt(source), "code-editor": bystander }
      const found = surveyImporters(moves(["tools/one.ts", "tools/deep/one.ts"]), at)
      expect(found).toHaveLength(1)
      expect(targetRepo(found[0]?.roots ?? at)).toBe("code-editor")
      expect(found[0]?.entries.map((one) => one.relPath)).toEqual(["src/uses.ts"])
      expect(found[0]?.repointed).toBe(1)
      expect(resolve(`${bystander}/src`, specifierIn(found[0]?.entries[0]?.body ?? ""))).toBe(
        `${source}/tools/deep/one.ts`
      )
    })
  })

  test("a path written into a config there follows the move, resolved rather than matched", () => {
    withBoth((source, bystander) => {
      tracked(source, "tools/one.ts", "export const one = 1\n")
      const spelling = relative(bystander, `${source}/tools/one.ts`)
      tracked(bystander, "tsconfig.json", `{\n  "include": [\n    "${spelling}"\n  ]\n}\n`)
      const at = { ...rootsAt(source), "code-editor": bystander }
      const found = surveyImporters(moves(["tools/one.ts", "tools/deep/one.ts"]), at)
      expect(found[0]?.entries.map((one) => one.relPath)).toEqual(["tsconfig.json"])
      expect(found[0]?.entries[0]?.body).toContain("/tools/deep/one.ts")
      expect(found[0]?.entries[0]?.body).not.toContain("/tools/one.ts")
    })
  })

  test("a repository naming nothing that moved is not one this act touches at all", () => {
    withBoth((source, bystander) => {
      tracked(source, "tools/one.ts", "export const one = 1\n")
      tracked(bystander, "src/uses.ts", "export const uses = 1\n")
      const at = { ...rootsAt(source), "code-editor": bystander }
      expect(surveyImporters(moves(["tools/one.ts", "tools/deep/one.ts"]), at)).toEqual([])
    })
  })
})
