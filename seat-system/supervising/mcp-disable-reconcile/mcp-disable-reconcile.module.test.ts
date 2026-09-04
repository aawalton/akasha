import { describe, expect, test } from "bun:test"
import { computeServersToClear, planDisableReconcile } from "./mcp-disable-reconcile.module.code.ts"

const CWD = "/var/home/walton/repos/akasha"
const same = (p: string): string => p

function config(entry: Record<string, unknown>, at: string = CWD): string {
  return JSON.stringify({ projects: { [at]: entry } }, null, 2)
}

describe("computeServersToClear", () => {
  test("clears only what is declared", () => {
    expect(computeServersToClear(["messages"], ["messages", "wobble"])).toEqual(["messages"])
  })

  test("clears nothing where nothing is declared", () => {
    expect(computeServersToClear([], ["messages"])).toEqual([])
  })
})

describe("planDisableReconcile", () => {
  test("switches a declared server back on", () => {
    const plan = planDisableReconcile(
      config({ disabledMcpServers: ["messages", "wobble"] }),
      CWD,
      ["messages"],
      same
    )
    expect(plan?.clearedServers).toEqual(["messages"])
    expect(JSON.parse(plan?.nextConfigText ?? "")).toMatchObject({
      projects: { [CWD]: { disabledMcpServers: ["wobble"] } },
    })
  })

  test("leaves a project that is not the launch directory alone", () => {
    const plan = planDisableReconcile(
      config({ disabledMcpServers: ["messages"] }, "/somewhere/else"),
      CWD,
      ["messages"],
      same
    )
    expect(plan).toBeNull()
  })

  test("reads a project through its real path", () => {
    const plan = planDisableReconcile(
      config({ disabledMcpServers: ["messages"] }, "/link/to/akasha"),
      CWD,
      ["messages"],
      (p) => (p === "/link/to/akasha" ? CWD : p)
    )
    expect(plan?.clearedServers).toEqual(["messages"])
  })

  test("plans nothing where there is nothing to clear", () => {
    expect(
      planDisableReconcile(config({ disabledMcpServers: [] }), CWD, ["messages"], same)
    ).toBeNull()
  })

  test("leaves text it cannot read alone", () => {
    expect(planDisableReconcile("{not json", CWD, ["messages"], same)).toBeNull()
  })

  test("leaves a configuration holding no projects alone", () => {
    expect(planDisableReconcile(JSON.stringify({}), CWD, ["messages"], same)).toBeNull()
  })

  test("keeps a trailing newline where the configuration had one", () => {
    const withNewline = `${config({ disabledMcpServers: ["messages"] })}\n`
    expect(planDisableReconcile(withNewline, CWD, ["messages"], same)?.nextConfigText).toEndWith(
      "\n"
    )
  })

  test("adds no trailing newline where the configuration had none", () => {
    const plan = planDisableReconcile(
      config({ disabledMcpServers: ["messages"] }),
      CWD,
      ["messages"],
      same
    )
    expect(plan?.nextConfigText.endsWith("\n")).toBe(false)
  })
})
