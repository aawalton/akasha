import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  deriveTstlRoots,
  isExcludedFromTstlScan,
  isTstlSourcePath,
  matchesTstlRoot,
} from "./tstl-source-paths.ts"

describe("deriveTstlRoots", () => {
  test("includes the dir of each tsconfig.json declaring a top-level tstl key", () => {
    const roots = deriveTstlRoots([
      {
        rel: "temper/addons/leads/tsconfig.json",
        text: '{ "tstl": { "luaTarget": "5.1" } }',
      },
      {
        rel: "temper/errors-addon/tsconfig.json",
        text: '{ "tstl": { "luaBundle": "x" } }',
      },
    ])
    expect([...roots].sort()).toEqual(["temper/addons/leads", "temper/errors-addon"])
  })

  test("tolerates JSONC comments and trailing commas in tsconfig text", () => {
    const roots = deriveTstlRoots([
      {
        rel: "temper/shared-interface-hud-window/tsconfig.json",
        text: '{\n  // bundled addon\n  "tstl": { "luaBundle": "x" },\n}\n',
      },
    ])
    expect(roots).toEqual(["temper/shared-interface-hud-window"])
  })

  test("excludes configs without a tstl key", () => {
    const roots = deriveTstlRoots([
      { rel: "temper/game-codec/tsconfig.json", text: '{ "compilerOptions": {} }' },
    ])
    expect(roots).toEqual([])
  })

  test("excludes tsconfig.base.json and other non-tsconfig.json basenames", () => {
    const roots = deriveTstlRoots([
      { rel: "temper/addons/tsconfig.base.json", text: '{ "tstl": {} }' },
      { rel: "temper/addons/leads/tsconfig.lua50.json", text: '{ "tstl": {} }' },
    ])
    expect(roots).toEqual([])
  })

  test("excludes __fixtures__ and node_modules paths", () => {
    const roots = deriveTstlRoots([
      {
        rel: "infra/cluster-checks/__fixtures__/with-outdir-tstl/tsconfig.json",
        text: '{ "tstl": {} }',
      },
      { rel: "node_modules/somepkg/tsconfig.json", text: '{ "tstl": {} }' },
    ])
    expect(roots).toEqual([])
  })
})

describe("matchesTstlRoot", () => {
  const roots = ["temper/addons/leads", "temper/errors-addon"]

  test("matches a file inside a root", () => {
    expect(matchesTstlRoot("temper/addons/leads/src/unit-list.ts", roots)).toBe(true)
  })

  test("matches the root dir exactly", () => {
    expect(matchesTstlRoot("temper/errors-addon", roots)).toBe(true)
  })

  test("does not match a sibling sharing a prefix but not a path boundary", () => {
    expect(matchesTstlRoot("temper/addons/leads-extra/src/x.ts", roots)).toBe(false)
  })

  test("does not match an unrelated path", () => {
    expect(matchesTstlRoot("temper/game-codec/src/index.ts", roots)).toBe(false)
  })
})

describe("isExcludedFromTstlScan", () => {
  test("excludes .d.ts declaration files", () => {
    expect(isExcludedFromTstlScan("temper/addons/leads/src/api.d.ts")).toBe(true)
  })

  test("excludes test files of any suffix", () => {
    expect(isExcludedFromTstlScan("temper/addons/leads/src/x.unit.test.ts")).toBe(true)
    expect(isExcludedFromTstlScan("temper/addons/leads/src/x.test.ts")).toBe(true)
    expect(isExcludedFromTstlScan("temper/addons/leads/src/x.test.tsx")).toBe(true)
  })

  test("does not exclude ordinary source files", () => {
    expect(isExcludedFromTstlScan("temper/addons/leads/src/unit-list.ts")).toBe(false)
  })
})

describe("isTstlSourcePath — the root it is given is the tree it reads", () => {
  const SCRATCH_PARENT = "/var/tmp"
  const roots: string[] = []

  const treeDeclaring = (dir: string): string => {
    const root = mkdtempSync(join(SCRATCH_PARENT, "tstl-source-paths-"))
    roots.push(root)
    mkdirSync(join(root, dir), { recursive: true })
    writeFileSync(join(root, dir, "tsconfig.json"), '{ "tstl": { "luaTarget": "5.1" } }')
    return root
  }

  afterAll(() => {
    for (const root of roots) rmSync(root, { recursive: true, force: true })
  })

  test("a file under a root only THIS tree declares is in scope", () => {
    const root = treeDeclaring("declared-here")
    expect(isTstlSourcePath("declared-here/src/a.ts", root)).toBe(true)
  })

  test("the same path is out of scope under a tree that declares a different root", () => {
    const other = treeDeclaring("declared-elsewhere")
    expect(isTstlSourcePath("declared-here/src/a.ts", other)).toBe(false)
  })

  test("two roots in one process get two answers, not the first one twice", () => {
    const declaring = treeDeclaring("shared-name")
    const notDeclaring = treeDeclaring("other-name")
    expect(isTstlSourcePath("shared-name/src/a.ts", declaring)).toBe(true)
    expect(isTstlSourcePath("shared-name/src/a.ts", notDeclaring)).toBe(false)
    expect(isTstlSourcePath("shared-name/src/a.ts", declaring)).toBe(true)
  })

  test("the path exclusions still hold under a root that declares it", () => {
    const root = treeDeclaring("declared-here")
    expect(isTstlSourcePath("declared-here/src/a.d.ts", root)).toBe(false)
    expect(isTstlSourcePath("declared-here/src/a.test.ts", root)).toBe(false)
  })
})
