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
    const entry = "foo/web/app/globals.css"
    const notEntry = "foo/web/app/idle/idle.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "foo/web"),
          packageNode("@foo/ui", "foo/ui"),
          cssFileNode(
            entry,
            [directive({ pattern: "../../ui/src/**", resolvedBase: "foo/ui/src" })],
            "@foo/web"
          ),
          cssFileNode(notEntry, [], "@foo/web"),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "foo/web/src"],
          ["@foo/ui", "foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(entry),
      })
    )
    expect(out).toEqual([])
  })

  test("two entry stylesheets in one workspace are audited separately", () => {
    const covered = "foo/web/app/globals.css"
    const bare = "foo/web/app-capacitor/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "foo/web"),
          packageNode("@foo/ui", "foo/ui"),
          cssFileNode(
            covered,
            [
              directive({
                pattern: "../../ui/src/**/*.{ts,tsx}",
                resolvedBase: "foo/ui/src",
              }),
            ],
            "@foo/web"
          ),
          cssFileNode(bare, [], "@foo/web"),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "foo/web/src"],
          ["@foo/ui", "foo/ui/src"],
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
    const aCss = "a/web/app/globals.css"
    const bCss = "b/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@a/web", "a/web"),
          packageNode("@a/ui", "a/ui"),
          packageNode("@b/web", "b/web"),
          packageNode("@b/ui", "b/ui"),
          cssFileNode(aCss, [], "@a/web"),
          cssFileNode(
            bCss,
            [
              directive({
                pattern: "../../ui/src/**/*.{ts,tsx}",
                resolvedBase: "b/ui/src",
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
          ["@a/web", "a/web/src"],
          ["@a/ui", "a/ui/src"],
          ["@b/web", "b/web/src"],
          ["@b/ui", "b/ui/src"],
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
