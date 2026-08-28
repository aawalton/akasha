import { describe, expect, it } from "bun:test"
import { folderFor, folderIn, pathFor } from "./where.ts"

describe("folderIn — the folder a glob fixes, or nothing where it fixes none", () => {
  it("takes the folder from a glob that names one", () => {
    expect(folderIn("akasha:pages/domain/*.domain.md")).toBe("pages/domain")
  })

  it("answers nothing where the folder itself is a wildcard, so no folder is invented", () => {
    expect(folderIn("akasha:**/*.domain.md")).toBe(null)
  })

  it("reads a glob carrying no repository, the colon being optional", () => {
    expect(folderIn("pages/finding/*.finding.md")).toBe("pages/finding")
  })
})

describe("folderFor — where a page type puts a page it has no place for yet", () => {
  it("falls back to the page type name where every glob is a wildcard", () => {
    expect(folderFor("domain", ["akasha:**/*.domain.md"])).toBe("pages/domain")
  })

  it("takes the first glob that fixes a folder rather than the first glob", () => {
    expect(folderFor("finding", ["akasha:**/*.finding.md", "akasha:pages/finding/*.finding.md"]))
      .toBe("pages/finding")
  })

  it("falls back where a page type states no globs at all", () => {
    expect(folderFor("session-tracking", [])).toBe("pages/session-tracking")
  })
})

describe("pathFor — a page file is named for its slug and its page type", () => {
  it("names the file for the slug, which is what binds the two together", () => {
    expect(pathFor("domain", ["akasha:**/*.domain.md"], "alan-harness")).toBe(
      "pages/domain/alan-harness.domain.md"
    )
  })
})
