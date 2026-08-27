import { describe, expect, test } from "bun:test"

import type { FunctionalType } from "../../../../../instructions/tools/lib/check-workflow/functional-type"
import {
  getAllDepNames,
  getRuntimeDepNames,
  hasOnlyPureWorkspaceDeps,
} from "./functional-type-dep-walkers.ts"
import type { PackageJsonShape } from "./functional-type-shapes.ts"

describe("hasOnlyPureWorkspaceDeps", () => {
  test("empty deps → true", () => {
    expect(hasOnlyPureWorkspaceDeps({}, new Map())).toBe(true)
  })

  test("only pure workspace deps → true", () => {
    const pkg: PackageJsonShape = {
      dependencies: { "@shared/a": "workspace:*", "@shared/b": "workspace:*" },
    }
    const map = new Map<string, FunctionalType>([
      ["@shared/a", "pure"],
      ["@shared/b", "pure"],
    ])
    expect(hasOnlyPureWorkspaceDeps(pkg, map)).toBe(true)
  })

  test("any non-pure workspace dep → false", () => {
    const pkg: PackageJsonShape = {
      dependencies: { "@shared/a": "workspace:*", "@shared/b": "workspace:*" },
    }
    const map = new Map<string, FunctionalType>([
      ["@shared/a", "pure"],
      ["@shared/b", "program"],
    ])
    expect(hasOnlyPureWorkspaceDeps(pkg, map)).toBe(false)
  })

  test("non-workspace deps (not in map) are ignored", () => {
    const pkg: PackageJsonShape = {
      dependencies: { zod: "^3.0.0", "@shared/a": "workspace:*" },
    }
    const map = new Map<string, FunctionalType>([["@shared/a", "pure"]])
    expect(hasOnlyPureWorkspaceDeps(pkg, map)).toBe(true)
  })

  test("checks the three runtime dep groups (deps, peer, optional) — devDeps exempt", () => {
    const map = new Map<string, FunctionalType>([["@shared/x", "access"]])
    expect(hasOnlyPureWorkspaceDeps({ dependencies: { "@shared/x": "workspace:*" } }, map)).toBe(
      false
    )
    expect(
      hasOnlyPureWorkspaceDeps({ peerDependencies: { "@shared/x": "workspace:*" } }, map)
    ).toBe(false)
    expect(
      hasOnlyPureWorkspaceDeps({ optionalDependencies: { "@shared/x": "workspace:*" } }, map)
    ).toBe(false)
    expect(hasOnlyPureWorkspaceDeps({ devDependencies: { "@shared/x": "workspace:*" } }, map)).toBe(
      true
    )
  })

  test("non-pure devDep alongside pure runtime deps still passes", () => {
    const pkg: PackageJsonShape = {
      dependencies: { "@shared/a": "workspace:*" },
      devDependencies: { "@infra/checks": "workspace:*", "@shared/b": "workspace:*" },
    }
    const map = new Map<string, FunctionalType>([
      ["@shared/a", "pure"],
      ["@infra/checks", "program"],
      ["@shared/b", "program"],
    ])
    expect(hasOnlyPureWorkspaceDeps(pkg, map)).toBe(true)
  })

  test("multi-group declaration: dep in BOTH dependencies AND devDependencies still fails on runtime side", () => {
    const pkg: PackageJsonShape = {
      dependencies: { "@shared/x": "workspace:*" },
      devDependencies: { "@shared/x": "workspace:*" },
    }
    const map = new Map<string, FunctionalType>([["@shared/x", "program"]])
    expect(hasOnlyPureWorkspaceDeps(pkg, map)).toBe(false)
  })
})

describe("getRuntimeDepNames", () => {
  test("empty package → []", () => {
    expect(getRuntimeDepNames({})).toEqual([])
  })

  test("walks the three runtime dep groups (deps, peer, optional) and excludes devDeps", () => {
    const pkg: PackageJsonShape = {
      dependencies: { a: "1" },
      devDependencies: { b: "1" },
      peerDependencies: { c: "1" },
      optionalDependencies: { d: "1" },
    }
    expect([...getRuntimeDepNames(pkg)].sort()).toEqual(["a", "c", "d"])
  })

  test("dedupes names appearing in multiple runtime groups", () => {
    const pkg: PackageJsonShape = {
      dependencies: { x: "1" },
      peerDependencies: { x: "1" },
      optionalDependencies: { x: "1" },
    }
    expect(getRuntimeDepNames(pkg)).toEqual(["x"])
  })

  test("does NOT include a name declared only in devDependencies", () => {
    const pkg: PackageJsonShape = {
      devDependencies: { "only-in-dev": "1" },
    }
    expect(getRuntimeDepNames(pkg)).toEqual([])
  })

  test("name in BOTH dependencies and devDependencies appears once (from runtime side)", () => {
    const pkg: PackageJsonShape = {
      dependencies: { x: "1" },
      devDependencies: { x: "1" },
    }
    expect(getRuntimeDepNames(pkg)).toEqual(["x"])
  })
})

describe("getAllDepNames", () => {
  test("empty package → []", () => {
    expect(getAllDepNames({})).toEqual([])
  })

  test("walks all four dep groups", () => {
    const pkg: PackageJsonShape = {
      dependencies: { a: "1" },
      devDependencies: { b: "1" },
      peerDependencies: { c: "1" },
      optionalDependencies: { d: "1" },
    }
    expect([...getAllDepNames(pkg)].sort()).toEqual(["a", "b", "c", "d"])
  })

  test("dedupes names appearing in multiple groups", () => {
    const pkg: PackageJsonShape = {
      dependencies: { x: "1" },
      devDependencies: { x: "1" },
      peerDependencies: { x: "1" },
      optionalDependencies: { x: "1" },
    }
    expect(getAllDepNames(pkg)).toEqual(["x"])
  })
})
