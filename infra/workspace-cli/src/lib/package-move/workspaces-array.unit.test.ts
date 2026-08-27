import { describe, expect, it } from "bun:test"
import { computeWorkspacesAfterMove } from "./workspaces-array"

const WS = [
  "packages/shared/a",
  "packages/shared/b",
  "packages/temper/addons/*",
  "packages/temper/addons/*/*",
]

describe("computeWorkspacesAfterMove", () => {
  it("no-ops when old and new are the same path", () => {
    expect(computeWorkspacesAfterMove(WS, "packages/shared/a", "packages/shared/a")).toEqual({
      workspaces: WS,
      changed: false,
    })
  })

  it("no-ops when both sides are glob-covered (addon → addon)", () => {
    expect(
      computeWorkspacesAfterMove(WS, "packages/temper/addons/foo", "packages/temper/addons/bar")
    ).toEqual({ workspaces: WS, changed: false })
  })

  it("no-ops when both sides are glob-covered across depths (addon → nested addon)", () => {
    expect(
      computeWorkspacesAfterMove(
        WS,
        "packages/temper/addons/foo",
        "packages/temper/addons/characters/sub"
      )
    ).toEqual({ workspaces: WS, changed: false })
  })

  it("renames the literal in place when neither side is glob-covered (non-addon → non-addon)", () => {
    const result = computeWorkspacesAfterMove(WS, "packages/shared/a", "packages/shared/c")
    expect(result.changed).toBe(true)
    expect(result.workspaces).toEqual([
      "packages/shared/c",
      "packages/shared/b",
      "packages/temper/addons/*",
      "packages/temper/addons/*/*",
    ])
  })

  it("appends the new literal when the move leaves a glob (addon → non-addon)", () => {
    const result = computeWorkspacesAfterMove(
      WS,
      "packages/temper/addons/foo",
      "packages/shared/foo"
    )
    expect(result.changed).toBe(true)
    expect(result.workspaces).toEqual([...WS, "packages/shared/foo"])
  })

  it("drops the old literal when the move enters a glob (non-addon → addon)", () => {
    const result = computeWorkspacesAfterMove(
      WS,
      "packages/shared/a",
      "packages/temper/addons/promoted"
    )
    expect(result.changed).toBe(true)
    expect(result.workspaces).toEqual([
      "packages/shared/b",
      "packages/temper/addons/*",
      "packages/temper/addons/*/*",
    ])
  })

  it("no-ops a neither-covered move when the old literal is absent", () => {
    expect(
      computeWorkspacesAfterMove(WS, "packages/shared/missing", "packages/shared/elsewhere")
    ).toEqual({ workspaces: WS, changed: false })
  })
})
