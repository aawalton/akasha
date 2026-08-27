import { describe, expect, test } from "bun:test"
import {
  cssFileNode,
  directive,
  examineAll,
  makeInput,
  packageNode,
  pkgDependsEdge,
} from "./tailwind-sources-violations.fixtures.ts"

const entries = (...paths: readonly string[]): ReadonlySet<string> => new Set(paths)

describe("tailwind-sources app enumeration", () => {
  test("a css file the shell did not classify as an entry is not an app", () => {
    const entry = "packages/foo/web/app/globals.css"
    const notEntry = "packages/foo/web/app/idle/idle.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/ui", "packages/foo/ui"),
          cssFileNode(
            entry,
            [directive({ pattern: "../../ui/src/**", resolvedBase: "packages/foo/ui/src" })],
            "@foo/web"
          ),
          cssFileNode(notEntry, [], "@foo/web"),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/ui", "packages/foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(entry),
      })
    )
    expect(out).toEqual([])
  })

  test("two entry stylesheets in one workspace are audited separately", () => {
    const covered = "packages/foo/web/app/globals.css"
    const bare = "packages/foo/web/app-capacitor/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/ui", "packages/foo/ui"),
          cssFileNode(
            covered,
            [
              directive({
                pattern: "../../ui/src/**/*.{ts,tsx}",
                resolvedBase: "packages/foo/ui/src",
              }),
            ],
            "@foo/web"
          ),
          cssFileNode(bare, [], "@foo/web"),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/ui", "packages/foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(covered, bare),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: bare,
        kind: "missing-source",
        detail: '@foo/ui is a UI dep; add: @source "../../ui/src/**/*.{ts,tsx}";',
      },
    ])
  })

  test("an entry owned by no workspace raises rather than passing quietly", () => {
    const cssRel = "tools/scratch/globals.css"
    expect(() =>
      examineAll(
        makeInput({
          nodes: [cssFileNode(cssRel, [], null)],
          packageSourceRootByName: new Map(),
          uiPackageNames: new Set(),
          entryCssPaths: entries(cssRel),
        })
      )
    ).toThrow(/owned by no workspace package/)
  })

  test("an app is found wherever its stylesheet sits", () => {
    const cssRel = "elsewhere/some-app/styles/entry.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@some/app", "elsewhere/some-app"),
          packageNode("@some/ui", "elsewhere/ui"),
          cssFileNode(cssRel, [], "@some/app"),
        ],
        edges: [pkgDependsEdge("@some/app", "@some/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@some/app", "elsewhere/some-app/src"],
          ["@some/ui", "elsewhere/ui/src"],
        ]),
        uiPackageNames: new Set(["@some/ui"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@some/app",
        stylesheet: cssRel,
        kind: "missing-source",
        detail: '@some/ui is a UI dep; add: @source "../../ui/src/**/*.{ts,tsx}";',
      },
    ])
  })

  test("multi-app graph: per-app violations grouped under each stylesheet", () => {
    const aCss = "packages/a/web/app/globals.css"
    const bCss = "packages/b/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@a/web", "packages/a/web"),
          packageNode("@a/ui", "packages/a/ui"),
          packageNode("@b/web", "packages/b/web"),
          packageNode("@b/ui", "packages/b/ui"),
          cssFileNode(aCss, [], "@a/web"),
          cssFileNode(
            bCss,
            [
              directive({
                pattern: "../../ui/src/**/*.{ts,tsx}",
                resolvedBase: "packages/b/ui/src",
              }),
            ],
            "@b/web"
          ),
        ],
        edges: [
          pkgDependsEdge("@a/web", "@a/ui", "dependencies"),
          pkgDependsEdge("@b/web", "@b/ui", "dependencies"),
        ],
        packageSourceRootByName: new Map([
          ["@a/web", "packages/a/web/src"],
          ["@a/ui", "packages/a/ui/src"],
          ["@b/web", "packages/b/web/src"],
          ["@b/ui", "packages/b/ui/src"],
        ]),
        uiPackageNames: new Set(["@a/ui", "@b/ui"]),
        entryCssPaths: entries(aCss, bCss),
      })
    )
    expect(out).toEqual([
      {
        app: "@a/web",
        stylesheet: aCss,
        kind: "missing-source",
        detail: '@a/ui is a UI dep; add: @source "../../ui/src/**/*.{ts,tsx}";',
      },
    ])
  })
})
