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

describe("tailwind-sources coverage rule", () => {
  test("empty graph → zero violations", () => {
    expect(
      examineAll(
        makeInput({
          nodes: [],
          packageSourceRootByName: new Map(),
          uiPackageNames: new Set(),
          entryCssPaths: entries(),
        })
      )
    ).toEqual([])
  })

  test("app with full @source coverage → zero violations", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/ui", "packages/foo/ui"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../ui/src/**/*.{ts,tsx}",
                resolvedBase: "packages/foo/ui/src",
              }),
            ],
            "@foo/web"
          ),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/ui", "packages/foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([])
  })

  test("invalid-path: directive whose resolvedBase is null → one violation", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          cssFileNode(
            cssRel,
            [directive({ pattern: "../../ghost/src/**/*.{ts,tsx}", line: 7, resolvedBase: null })],
            "@foo/web"
          ),
        ],
        packageSourceRootByName: new Map([["@foo/web", "packages/foo/web/src"]]),
        uiPackageNames: new Set(),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "invalid-path",
        detail:
          "line 7: ../../ghost/src/**/*.{ts,tsx} → /repo/packages/foo/ghost/src (does not exist)",
      },
    ])
  })

  test("missing-source: UI dep not covered → one violation", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/ui", "packages/foo/ui"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../other/src/**/*.{ts,tsx}",
                resolvedBase: "packages/foo/other/src",
              }),
            ],
            "@foo/web"
          ),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/ui", "packages/foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "missing-source",
        detail: '@foo/ui is a UI dep; add: @source "../../ui/src/**/*.{ts,tsx}";',
      },
    ])
  })

  test("broader-than-workspace directive covers nested workspaces (bidirectional)", () => {
    const cssRel = "packages/aw/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@aw/web", "packages/aw/web"),
          packageNode("@aw/projects-core", "packages/aw/projects/core"),
          packageNode("@aw/projects-cli", "packages/aw/projects/cli"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../projects/**/*.{ts,tsx}",
                resolvedBase: "packages/aw/projects",
              }),
            ],
            "@aw/web"
          ),
        ],
        edges: [
          pkgDependsEdge("@aw/web", "@aw/projects-core", "dependencies"),
          pkgDependsEdge("@aw/web", "@aw/projects-cli", "dependencies"),
        ],
        packageSourceRootByName: new Map([
          ["@aw/web", "packages/aw/web/src"],
          ["@aw/projects-core", "packages/aw/projects/core/src"],
          ["@aw/projects-cli", "packages/aw/projects/cli/src"],
        ]),
        uiPackageNames: new Set(["@aw/projects-core", "@aw/projects-cli"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([])
  })

  test("narrower-than-workspace directive covers parent workspace (bidirectional)", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@shared/foo", "packages/shared/foo"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../../shared/foo/src/components/**/*.{ts,tsx}",
                resolvedBase: "packages/shared/foo/src/components",
              }),
            ],
            "@foo/web"
          ),
        ],
        edges: [pkgDependsEdge("@foo/web", "@shared/foo", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@shared/foo", "packages/shared/foo/src"],
        ]),
        uiPackageNames: new Set(["@shared/foo"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([])
  })

  test("negated `@source not` directive never counts toward coverage", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/ui", "packages/foo/ui"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../ui/src/**/*.spec.tsx",
                resolvedBase: "packages/foo/ui/src",
                negated: true,
              }),
            ],
            "@foo/web"
          ),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/ui", "packages/foo/ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/ui"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "missing-source",
        detail: '@foo/ui is a UI dep; add: @source "../../ui/src/**/*.{ts,tsx}";',
      },
    ])
  })

  test("non-UI dep emits no violation", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/non-ui", "packages/foo/non-ui"),
          cssFileNode(cssRel, [], "@foo/web"),
        ],
        edges: [pkgDependsEdge("@foo/web", "@foo/non-ui", "dependencies")],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/non-ui", "packages/foo/non-ui/src"],
        ]),
        uiPackageNames: new Set(),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([])
  })

  test("app workspace itself is skipped (Tailwind auto-scans the project root)", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [packageNode("@foo/web", "packages/foo/web"), cssFileNode(cssRel, [], "@foo/web")],
        edges: [pkgDependsEdge("@foo/web", "@foo/web", "dependencies")],
        packageSourceRootByName: new Map([["@foo/web", "packages/foo/web/src"]]),
        uiPackageNames: new Set(["@foo/web"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([])
  })

  test("peerDependencies and optionalDependencies are in the closure", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@foo/peer-ui", "packages/foo/peer-ui"),
          packageNode("@foo/optional-ui", "packages/foo/optional-ui"),
          cssFileNode(cssRel, [], "@foo/web"),
        ],
        edges: [
          pkgDependsEdge("@foo/web", "@foo/peer-ui", "peerDependencies"),
          pkgDependsEdge("@foo/web", "@foo/optional-ui", "optionalDependencies"),
        ],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@foo/peer-ui", "packages/foo/peer-ui/src"],
          ["@foo/optional-ui", "packages/foo/optional-ui/src"],
        ]),
        uiPackageNames: new Set(["@foo/peer-ui", "@foo/optional-ui"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "missing-source",
        detail: '@foo/optional-ui is a UI dep; add: @source "../../optional-ui/src/**/*.{ts,tsx}";',
      },
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "missing-source",
        detail: '@foo/peer-ui is a UI dep; add: @source "../../peer-ui/src/**/*.{ts,tsx}";',
      },
    ])
  })

  test("a peer reached through an intermediate workspace is still demanded", () => {
    const cssRel = "packages/foo/web/app/globals.css"
    const out = examineAll(
      makeInput({
        nodes: [
          packageNode("@foo/web", "packages/foo/web"),
          packageNode("@shared/pages-ui", "packages/shared/pages/ui"),
          packageNode("@shared/design-system", "packages/shared/design/system"),
          cssFileNode(
            cssRel,
            [
              directive({
                pattern: "../../../shared/pages/ui/src/**/*.{ts,tsx}",
                resolvedBase: "packages/shared/pages/ui/src",
              }),
            ],
            "@foo/web"
          ),
        ],
        edges: [
          pkgDependsEdge("@foo/web", "@shared/pages-ui", "dependencies"),
          pkgDependsEdge("@shared/pages-ui", "@shared/design-system", "peerDependencies"),
        ],
        packageSourceRootByName: new Map([
          ["@foo/web", "packages/foo/web/src"],
          ["@shared/pages-ui", "packages/shared/pages/ui/src"],
          ["@shared/design-system", "packages/shared/design/system/src"],
        ]),
        uiPackageNames: new Set(["@shared/pages-ui", "@shared/design-system"]),
        entryCssPaths: entries(cssRel),
      })
    )
    expect(out).toEqual([
      {
        app: "@foo/web",
        stylesheet: cssRel,
        kind: "missing-source",
        detail:
          '@shared/design-system is a UI dep; add: @source "../../../shared/design/system/src/**/*.{ts,tsx}";',
      },
    ])
  })
})
