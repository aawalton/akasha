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
    const both = { ...rootsAt(source), memory: source, books: destination }
    return { source: { ...both, target: "memory" }, destination: { ...both, target: "books" } }
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
      from.put("domains/x.md", "# X\n\nIt names [thing](../schemas/thing.md).\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["domains/x.md", "pages/x.md"]), at.source, at.destination)
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
      from.put("domains/x.md", "# X\n")
      from.put("domains/y.md", "# Y\n\nBack to [x](x.md).\n")
      const at = twoRepos(from.root, to.root)
      const survey = surveyRename(moves(["domains/x.md", "pages/x.md"]), at.source, at.destination)
      const entry = survey.entries.find((e) => e.relPath === "domains/y.md")
      expect(entry?.moved).toBe(false)
      expect(resolve(`${from.root}/domains`, hrefIn(entry?.body, "x"))).toBe(`${to.root}/pages/x.md`)
    } finally {
      to.dispose()
      from.dispose()
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
      const at = { ...rootsAt(source), books: bystander }
      const found = surveyImporters(moves(["tools/one.ts", "tools/deep/one.ts"]), at)
      expect(found).toHaveLength(1)
      expect(targetRepo(found[0]?.roots ?? at)).toBe("books")
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
      const at = { ...rootsAt(source), books: bystander }
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
      const at = { ...rootsAt(source), books: bystander }
      expect(surveyImporters(moves(["tools/one.ts", "tools/deep/one.ts"]), at)).toEqual([])
    })
  })
})
