import { describe, expect, test } from "bun:test"
import { findOrphanSources } from "./orphan-source.ts"

const WORKSPACES = ["shared/pages-access", "temper/addons", "infra/auth-proxy"] as const

function orphansOf(files: readonly string[]): readonly string[] {
  return findOrphanSources({ files, workspaceDirs: WORKSPACES }).map((o) => o.file)
}

describe("findOrphanSources", () => {
  test("a source file under a workspace scope but in no workspace is an orphan", () => {
    expect(orphansOf(["shared/stray.ts"])).toEqual(["shared/stray.ts"])
  })

  test("a source file inside a workspace is owned", () => {
    expect(orphansOf(["shared/pages-access/src/index.ts"])).toEqual([])
  })

  test("a source file outside every workspace scope is out of bounds", () => {
    expect(orphansOf(["tools/lib/thing.ts", "page/name/name.ts"])).toEqual([])
  })

  test("a scope holding workspaces is still scanned when the file sits deep in it", () => {
    expect(orphansOf(["temper/loose/helper.tsx"])).toEqual(["temper/loose/helper.tsx"])
  })

  test("declaration and generated files are not orphans", () => {
    expect(orphansOf(["shared/a.d.ts", "shared/b.generated.ts", "shared/c.generated.tsx"])).toEqual(
      []
    )
  })

  test("a non-source extension is not an orphan", () => {
    expect(orphansOf(["shared/notes.md", "infra/config.json"])).toEqual([])
  })

  test("a file under an exempt directory is not an orphan", () => {
    expect(orphansOf(["shared/node_modules/pkg/index.ts"])).toEqual([])
  })

  test("orphans come back sorted", () => {
    expect(orphansOf(["temper/z.ts", "infra/a.ts", "shared/m.ts"])).toEqual([
      "infra/a.ts",
      "shared/m.ts",
      "temper/z.ts",
    ])
  })
})
