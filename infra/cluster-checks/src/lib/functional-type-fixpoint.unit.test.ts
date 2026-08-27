import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { type FixpointWorkspace, runFunctionalTypeFixpoint } from "./functional-type-fixpoint.ts"
import type { PackageJsonShape } from "./functional-type-shapes.ts"

function writeFile(workspaceDir: string, relPath: string, body: string): undefined {
  const full = join(workspaceDir, relPath)
  mkdirSync(join(full, ".."), { recursive: true })
  writeFileSync(full, body, "utf-8")
}

function makeWorkspace(
  root: string,
  path: string,
  args: {
    name?: string
    pkg?: PackageJsonShape
    declared?: FixpointWorkspace["declared"]
    files?: Record<string, string>
  }
): FixpointWorkspace {
  const workspaceDir = join(root, path)
  mkdirSync(workspaceDir, { recursive: true })
  const files = args.files ?? {}
  for (const [rel, body] of Object.entries(files)) {
    writeFile(workspaceDir, rel, body)
  }
  return {
    path,
    name: args.name,
    pkg: args.pkg ?? {},
    workspaceDir,
    declared: args.declared ?? null,
  }
}

describe("runFunctionalTypeFixpoint — base cases", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "ft-fixpoint-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("empty workspace list → 1 iteration, empty maps", () => {
    const result = runFunctionalTypeFixpoint([])
    expect(result.iterations).toBe(1)
    expect(result.inferredByName.size).toBe(0)
    expect(result.inferredByPath.size).toBe(0)
  })

  test("single pure workspace with no deps → pure, 1 iteration", () => {
    const ws = [makeWorkspace(tmp, "a", { name: "@x/a", declared: "pure" })]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.iterations).toBe(1)
    expect(result.inferredByName.get("@x/a")).toBe("pure")
    expect(result.inferredByPath.get("a")).toBe("pure")
  })

  test("workspace without name still gets classified (via inferredByPath)", () => {
    const ws = [makeWorkspace(tmp, "a", { declared: null })]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByPath.get("a")).toBe("pure")
    expect(result.inferredByName.size).toBe(0)
  })
})

describe("runFunctionalTypeFixpoint — convergence shapes", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "ft-fixpoint-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("graph stable in 1 pass — every declared = inferred", () => {
    const ws = [
      makeWorkspace(tmp, "a", { name: "@x/a", declared: "pure" }),
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: "pure",
        pkg: { dependencies: { "@x/a": "workspace:*" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/a")).toBe("pure")
    expect(result.inferredByName.get("@x/b")).toBe("pure")
    expect(result.iterations).toBe(1)
  })

  test("mis-declared neighbor: A imports B-declared-pure-but-actually-cli → A throws (no chain match)", () => {
    const ws = [
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: "pure",
        pkg: { bin: { "@x/b": "./src/cli.ts" } },
      }),
      makeWorkspace(tmp, "a", {
        name: "@x/a",
        declared: "pure",
        pkg: { dependencies: { "@x/b": "workspace:*" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.unclassifiedPaths).toEqual(new Set(["a"]))
    expect(result.inferredByName.get("@x/b")).toBe("program")
    expect(result.inferredByPath.has("a")).toBe(false)
  })

  test("mis-declared neighbor: A imports B-declared-pure-but-actually-cli → fixpoint reflects B's inferred value (no A)", () => {
    const ws = [
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: "pure",
        pkg: { bin: { "@x/b": "./src/cli.ts" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/b")).toBe("program")
  })

  test("rank-monotonicity: pure-candidate transitions away from pure, never the reverse", () => {
    const ws = [
      makeWorkspace(tmp, "c", {
        name: "@x/c",
        declared: "pure",
        pkg: { bin: { "@x/c": "./src/cli.ts" } },
      }),
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: "pure",
        pkg: { dependencies: { "@x/c": "workspace:*" } },
      }),
      makeWorkspace(tmp, "a", {
        name: "@x/a",
        declared: "pure",
        pkg: { dependencies: { "@x/b": "workspace:*" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/c")).toBe("program")
    expect(result.unclassifiedPaths).toEqual(new Set(["b", "a"]))
  })

  test("cycle a → b → a, both declared pure, b has bin field — a is unclassified after b becomes program", () => {
    const ws = [
      makeWorkspace(tmp, "a", {
        name: "@x/a",
        declared: "pure",
        pkg: { dependencies: { "@x/b": "workspace:*" } },
      }),
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: "pure",
        pkg: {
          bin: { "@x/b": "./src/cli.ts" },
          dependencies: { "@x/a": "workspace:*" },
        },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/b")).toBe("program")
    expect(result.unclassifiedPaths).toEqual(new Set(["a"]))
  })

  test("self-cycle a → a (declared pure, clean source) → stays pure", () => {
    const ws = [
      makeWorkspace(tmp, "a", {
        name: "@x/a",
        declared: "pure",
        pkg: { dependencies: { "@x/a": "workspace:*" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/a")).toBe("pure")
  })
})

describe("runFunctionalTypeFixpoint — declared vs inferred separation", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "ft-fixpoint-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("MismatchedFunctionalType still fires on the mis-declared workspace itself", () => {
    const b = makeWorkspace(tmp, "b", {
      name: "@x/b",
      declared: "pure",
      pkg: { bin: { "@x/b": "./src/cli.ts" } },
    })
    const result = runFunctionalTypeFixpoint([b])
    expect(b.declared).toBe("pure")
    expect(result.inferredByName.get("@x/b")).toBe("program")
  })

  test("undeclared workspace (declared=null) still gets classified, but seed map omits it", () => {
    const ws = [
      makeWorkspace(tmp, "b", {
        name: "@x/b",
        declared: null,
        pkg: { bin: { "@x/b": "./src/cli.ts" } },
      }),
      makeWorkspace(tmp, "a", {
        name: "@x/a",
        declared: "pure",
        pkg: { dependencies: { "@x/b": "workspace:*" } },
      }),
    ]
    const result = runFunctionalTypeFixpoint(ws)
    expect(result.inferredByName.get("@x/b")).toBe("program")
    expect(result.unclassifiedPaths).toEqual(new Set(["a"]))
  })
})

describe("runFunctionalTypeFixpoint — defensive guard", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "ft-fixpoint-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("maxIterations=0 throws immediately — defensive guard fires loudly", () => {
    const ws = [makeWorkspace(tmp, "a", { name: "@x/a", declared: "pure" })]
    expect(() => runFunctionalTypeFixpoint(ws, { maxIterations: 0 })).toThrow(
      /exceeded maxIterations/
    )
  })

  test("maxIterations=1 succeeds for a graph stable in 1 pass", () => {
    const ws = [makeWorkspace(tmp, "a", { name: "@x/a", declared: "pure" })]
    const result = runFunctionalTypeFixpoint(ws, { maxIterations: 1 })
    expect(result.iterations).toBe(1)
  })
})
