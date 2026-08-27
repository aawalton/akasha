import { describe, expect, test } from "bun:test"

import { FUNCTIONAL_TYPES, type FunctionalType } from "../../../../../instructions/tools/lib/check-workflow/functional-type"
import {
  ACT_BY_KIND,
  type Finding,
  findFunctionalTypeViolations,
  type WorkspaceTypeRead,
} from "./functional-type-rules.ts"

function read(
  path: string,
  result: WorkspaceTypeRead["result"],
  inferred: FunctionalType | null = null,
  unclassifiable = false
): WorkspaceTypeRead {
  return { path, result, inferred, unclassifiable }
}

function kinds(findings: readonly Finding[]): readonly string[] {
  return findings.map((f) => f.kind)
}

describe("findFunctionalTypeViolations", () => {
  test("empty input → zero findings", () => {
    expect(findFunctionalTypeViolations([])).toEqual([])
  })

  test("declared and inferred agree → zero findings", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: "pure", raw: "pure" }, "pure"),
      read("packages/b", { type: "access", raw: "access" }, "access"),
      read("packages/c", { type: "next-ui", raw: "next-ui" }, "next-ui"),
    ])
    expect(findings).toEqual([])
  })

  test("missing field → MissingFunctionalType finding", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: null, raw: undefined }),
    ])
    expect(findings).toEqual([{ kind: "MissingFunctionalType", path: "packages/a" }])
  })

  test("invalid value → InvalidFunctionalType finding with raw", () => {
    const findings = findFunctionalTypeViolations([read("packages/a", { type: null, raw: "ui" })])
    expect(findings).toEqual([{ kind: "InvalidFunctionalType", path: "packages/a", raw: "ui" }])
  })

  test("declared program but inferred next-ui → MismatchedFunctionalType", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: "program", raw: "program" }, "next-ui"),
    ])
    expect(findings).toEqual([
      {
        kind: "MismatchedFunctionalType",
        path: "packages/a",
        declared: "program",
        inferred: "next-ui",
      },
    ])
  })

  test("declared pure but inferred program → MismatchedFunctionalType", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: "pure", raw: "pure" }, "program"),
    ])
    expect(findings).toEqual([
      {
        kind: "MismatchedFunctionalType",
        path: "packages/a",
        declared: "pure",
        inferred: "program",
      },
    ])
  })

  test("declared valid value with inferred=null → no MismatchedFunctionalType emitted", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: "pure", raw: "pure" }, null),
    ])
    expect(findings).toEqual([])
  })

  test("mixed missing + invalid + mismatched + ok → all surface", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/valid", { type: "pure", raw: "pure" }, "pure"),
      read("packages/missing", { type: null, raw: undefined }),
      read("packages/invalid", { type: null, raw: "frontend" }),
      read("packages/mismatched", { type: "next-ui", raw: "next-ui" }, "program"),
    ])
    expect(kinds(findings)).toEqual([
      "InvalidFunctionalType",
      "MismatchedFunctionalType",
      "MissingFunctionalType",
    ])
    expect(findings).toEqual([
      { kind: "InvalidFunctionalType", path: "packages/invalid", raw: "frontend" },
      {
        kind: "MismatchedFunctionalType",
        path: "packages/mismatched",
        declared: "next-ui",
        inferred: "program",
      },
      { kind: "MissingFunctionalType", path: "packages/missing" },
    ])
  })

  test("chain matched no row → UnclassifiableWorkspace carrying the declared value", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: "pure", raw: "pure" }, null, true),
    ])
    expect(findings).toEqual([
      { kind: "UnclassifiableWorkspace", path: "packages/a", declared: "pure" },
    ])
  })

  test("unclassifiable with no declared value → one finding, not a MissingFunctionalType", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/a", { type: null, raw: undefined }, null, true),
      read("packages/b", { type: null, raw: "frontend" }, null, true),
    ])
    expect(findings).toEqual([
      { kind: "UnclassifiableWorkspace", path: "packages/a", declared: null },
      { kind: "UnclassifiableWorkspace", path: "packages/b", declared: null },
    ])
  })

  test("one unclassifiable workspace does not suppress the findings on the others", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/honest", { type: "pure", raw: "pure" }, null, true),
      read("packages/lying", { type: "pure", raw: "pure" }, "program"),
    ])
    expect(kinds(findings)).toEqual(["UnclassifiableWorkspace", "MismatchedFunctionalType"])
  })

  test("every finding kind carries an act, and every act names something to do", () => {
    const kindsSeen: readonly Finding["kind"][] = [
      "MissingFunctionalType",
      "InvalidFunctionalType",
      "MismatchedFunctionalType",
      "UnclassifiableWorkspace",
    ]
    expect(Object.keys(ACT_BY_KIND).sort()).toEqual([...kindsSeen].sort())
    for (const kind of kindsSeen) expect(ACT_BY_KIND[kind].length).toBeGreaterThan(20)
  })

  test("the invalid-value act lists the vocabulary rather than naming a document", () => {
    for (const type of FUNCTIONAL_TYPES) {
      expect(ACT_BY_KIND.InvalidFunctionalType).toContain(type)
    }
  })

  test("findings are sorted by path then kind", () => {
    const findings = findFunctionalTypeViolations([
      read("packages/z", { type: null, raw: undefined }),
      read("packages/a", { type: null, raw: undefined }),
      read("packages/m", { type: null, raw: undefined }),
    ])
    expect(findings.map((f) => f.path)).toEqual(["packages/a", "packages/m", "packages/z"])
  })
})
