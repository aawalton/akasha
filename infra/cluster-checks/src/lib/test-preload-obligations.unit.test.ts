import { describe, expect, test } from "bun:test"
import {
  bunfigRegisters,
  collectObligations,
  preloadRemedy,
  preloadsNeededBy,
} from "./test-preload-obligations.ts"

describe("preloadsNeededBy", () => {
  test("the DOM obligation comes from the component suffix", () => {
    expect(preloadsNeededBy("a/src/x.component.test.tsx")).toEqual(["dom"])
  })

  test("every other test type owes nothing", () => {
    expect(preloadsNeededBy("a/src/x.unit.test.ts")).toEqual([])
    expect(preloadsNeededBy("a/src/x.integration.test.ts")).toEqual([])
  })
})

describe("bunfigRegisters", () => {
  test("the shared happydom entry registers the DOM", () => {
    expect(bunfigRegisters(`[test]\npreload = ["@shared/utils-test/setup/happydom"]\n`)).toBe(true)
  })

  test("a workspace-local happydom shim registers the DOM", () => {
    expect(bunfigRegisters(`[test]\npreload = ["./test/happydom.ts"]\n`)).toBe(true)
  })

  test("the component-dom-guard is not a DOM registration", () => {
    const bunfig = `[test]\npreload = ["@shared/utils-test/setup/component-dom-guard"]\n`
    expect(bunfigRegisters(bunfig)).toBe(false)
  })

  test("an absent bunfig registers nothing", () => {
    expect(bunfigRegisters("")).toBe(false)
  })
})

describe("collectObligations", () => {
  test("every file owing one preload folds into one obligation, files sorted", () => {
    expect(
      collectObligations([
        {
          file: "b/src/y.component.test.tsx",
          workspace: "b",
          kind: "dom",
        },
        {
          file: "b/src/x.component.test.tsx",
          workspace: "b",
          kind: "dom",
        },
      ])
    ).toEqual([
      {
        workspace: "b",
        kind: "dom",
        files: ["b/src/x.component.test.tsx", "b/src/y.component.test.tsx"],
      },
    ])
  })

  test("two workspaces stay apart, ordered by workspace", () => {
    const obligations = collectObligations([
      { file: "z/src/a.component.test.tsx", workspace: "z", kind: "dom" },
      { file: "a/src/a.component.test.tsx", workspace: "a", kind: "dom" },
    ])
    expect(obligations.map((o) => `${o.workspace} ${o.kind}`)).toEqual([
      "a dom",
      "z dom",
    ])
  })
})

describe("preloadRemedy", () => {
  test("a workspace holding a bunfig is sent to the array, not to a new file", () => {
    const obligation = {
      workspace: "b",
      kind: "dom" as const,
      files: ["b/src/x.component.test.tsx"],
    }
    expect(preloadRemedy(obligation, false).join("\n")).toContain(
      "Add a bunfig.toml at the workspace root"
    )
    const held = preloadRemedy(obligation, true).join("\n")
    expect(held).toContain("b/bunfig.toml")
    expect(held).not.toContain("Add a bunfig.toml at the workspace root")
  })
})
