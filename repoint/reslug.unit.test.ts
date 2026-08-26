import { describe, expect, test } from "bun:test"
import { diskFileTree } from "../page/file-tree.ts"
import type { Roots } from "../page/page.ts"
import { shapeMarkOf } from "../page/shape/mark.ts"
import { resolveRoots } from "../repo/roots/roots.ts"
import { fixture, installPages } from "./fixture.ts"
import { type Moves, surveyRename } from "./repoint.ts"
import { readOnce, slugEdges } from "./reslug.ts"

const SCHEMAS = [
  "pages/page-type/page.page-type.md",
  "pages/page-type/domain.page-type.md",
  "pages/page-type/alert.page-type.md",
  "pages/page-type/refusal.page-type.md",
  "pages/page-property-definition/domain-parent-slug.page-property-definition.md",
  "pages/page-property-definition/domain-required-reading-slugs.page-property-definition.md",
  "pages/page-property-definition/page-title.page-property-definition.md",
  "pages/page-property-definition/alert-role-slug.page-property-definition.md",
  "pages/page-property-definition/refusal-holes.page-property-definition.md",
]

function rootsAt(at: string): Roots {
  return { instructions: at, code: `${at}/nonexistent-code`, memory: `${at}/nonexistent-memory`, books: `${at}/nonexistent-books`, stories: `${at}/nonexistent-stories`, "code-editor": `${at}/nonexistent-code-editor` }
}

function moves(...pairs: readonly (readonly [string, string])[]): Moves {
  return new Map(pairs)
}

function landed(root: string, pairs: Moves, relPath: string): string | null {
  return surveyRename(pairs, rootsAt(root)).entries.find((e) => e.relPath === relPath)?.body ?? null
}

function declaring(slug: string, term: string): string {
  return `---\nslug: ${slug}\ndomain-parent-slug: hearth\n---\n\n# Definition\n\n- **${term}** — a standing instruction.\n`
}

describe("the tree the slug keys are read through", () => {
  test("hands on the root and the pending set a caller's caches are keyed on", () => {
    const bare = diskFileTree(resolveRoots())
    const handed = readOnce(bare)
    expect(handed.root).toBe(bare.root)
    expect(handed.pending).toBe(bare.pending)
    expect(shapeMarkOf(handed)).toBe(shapeMarkOf(bare))
  })
})

describe("the domain a moved file declares", () => {
  test("follows the new filename, and every frontmatter value naming it follows with it", () => {
    const at = fixture()
    try {
      installPages(at.root, SCHEMAS)
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put(
        "pages/domain/north/sconce.md",
        "---\nslug: sconce\ndomain-parent-slug: lantern\nrequired-reading-slugs:\n  - lantern\n---\n\n# Definition\n"
      )
      const pairs = moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"])
      expect(landed(at.root, pairs, "pages/domain/north/beacon.md")).toContain("slug: beacon")
      const child = landed(at.root, pairs, "pages/domain/north/sconce.md") ?? ""
      expect(child).toContain("domain-parent-slug: beacon")
      expect(child).toContain("- beacon")
    } finally {
      at.dispose()
    }
  })

  test("follows through a key outside the handful anyone lists by hand, the set being the schemas'", () => {
    const at = fixture()
    try {
      installPages(at.root, SCHEMAS)
      at.put("pages/domain/north/watchman.md", declaring("watchman", "Watchman"))
      at.put(
        "pages/alert/vigil.md",
        "---\npage-type-slug: alert\nslug: vigil\ndomain-parent-slug: hearth\nrole-slug: watchman\n---\n\n# Definition\n"
      )
      const body = landed(
        at.root,
        moves(["pages/domain/north/watchman.md", "pages/domain/north/warden.md"]),
        "pages/alert/vigil.md"
      )
      expect(body).toContain("role-slug: warden")
    } finally {
      at.dispose()
    }
  })

  test("is untouched by a move between folders, which changes no filename", () => {
    const at = fixture()
    try {
      installPages(at.root, SCHEMAS)
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put("pages/domain/north/sconce.md", "---\nslug: sconce\ndomain-parent-slug: lantern\n---\n\n# Definition\n")
      const pairs = moves(["pages/domain/north/lantern.md", "pages/domain/south/lantern.md"])
      expect(landed(at.root, pairs, "pages/domain/south/lantern.md")).toContain("slug: lantern")
      expect(landed(at.root, pairs, "pages/domain/north/sconce.md")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("does not reach a key whose values are names rather than pages", () => {
    const at = fixture()
    try {
      installPages(at.root, SCHEMAS)
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put("pages/refusal/snuffer.md", "---\nslug: snuffer\npage-type-slug: refusal\nholes:\n  - lantern\n---\n\n# Refusal\n\n{lantern} is out.\n")
      expect(
        landed(
          at.root,
          moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
          "pages/refusal/snuffer.md"
        )
      ).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("does not reach a value that merely reads like the retired slug under another key", () => {
    const at = fixture()
    try {
      installPages(at.root, SCHEMAS)
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put("pages/domain/north/taper.md", '---\nslug: taper\ndomain-parent-slug: hearth\ntitle: "lantern"\n---\n\n# Definition\n')
      expect(
        landed(
          at.root,
          moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
          "pages/domain/north/taper.md"
        )
      ).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

describe("an address whose slug half a move retires", () => {
  function stated(at: ReturnType<typeof fixture>, value: string): void {
    installPages(at.root, SCHEMAS)
    at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
    at.put("pages/page-property-definition/alert-beacon-address.md", "---\npage-type-slug: page-property-definition\nslug: alert-beacon-address\ndefined-on-slug: alert\nkey: beacon-address\ntype: relation-address\n---\n\n# Definition\n")
    at.put(
      "pages/alert/vigil.md",
      `---\npage-type-slug: alert\nslug: vigil\ndomain-parent-slug: hearth\nbeacon-address: ${value}\n---\n\n# Definition\n`
    )
  }

  test("follows in its slug half, its page type half left as it was", () => {
    const at = fixture()
    try {
      stated(at, "domain/lantern")
      const body = landed(
        at.root,
        moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
        "pages/alert/vigil.md"
      )
      expect(body).toContain("beacon-address: domain/beacon")
    } finally {
      at.dispose()
    }
  })

  test("stays where its slug half names a page the move leaves alone", () => {
    const at = fixture()
    try {
      stated(at, "domain/hearth")
      const body = landed(
        at.root,
        moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
        "pages/alert/vigil.md"
      )
      expect(body).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

describe("a link label", () => {
  test("follows the file where it is exactly the old filename, and stays where it is prose", () => {
    const at = fixture()
    try {
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put("pages/domain/north/wick.md", "# Wick\n\nSee [lantern](lantern.md) and [the lantern](lantern.md).\n")
      const body =
        landed(
          at.root,
          moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
          "pages/domain/north/wick.md"
        ) ?? ""
      expect(body).toContain("[beacon](beacon.md)")
      expect(body).toContain("[the lantern](beacon.md)")
    } finally {
      at.dispose()
    }
  })

  test("is left alone by a move between folders, the name it states not having changed", () => {
    const at = fixture()
    try {
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      at.put("pages/domain/north/wick.md", "# Wick\n\nSee [lantern](lantern.md).\n")
      const body = landed(
        at.root,
        moves(["pages/domain/north/lantern.md", "pages/domain/south/lantern.md"]),
        "pages/domain/north/wick.md"
      )
      expect(body).toContain("[lantern](../south/lantern.md)")
    } finally {
      at.dispose()
    }
  })
})

describe("slugEdges", () => {
  test("names the slug the move carried and the Definition term it did not rewrite", () => {
    const at = fixture()
    try {
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      const outcome = slugEdges(
        moves(["pages/domain/north/lantern.md", "pages/domain/north/beacon.md"]),
        rootsAt(at.root)
      )
      expect(outcome.verdict).toBe("advisory")
      const said = outcome.messages.join("\n")
      expect(said).toContain("slug: lantern")
      expect(said).toContain("beacon")
      expect(said).toContain("**Lantern**")
    } finally {
      at.dispose()
    }
  })

  test("stands aside where the filename does not change, no slug having moved", () => {
    const at = fixture()
    try {
      at.put("pages/domain/north/lantern.md", declaring("lantern", "Lantern"))
      const outcome = slugEdges(
        moves(["pages/domain/north/lantern.md", "pages/domain/south/lantern.md"]),
        rootsAt(at.root)
      )
      expect(outcome.verdict).toBe("not-applicable")
    } finally {
      at.dispose()
    }
  })
})
