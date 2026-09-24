import { expect, mock, test } from "bun:test"

mock.module("vscode", () => ({
  window: {
    showWarningMessage: async () => undefined,
    showErrorMessage: async () => undefined,
  },
}))

const { confirmSubagentStop, invokedSubagent, pageNameOf, stopCall, subagentContextValue } =
  await import(
    "akasha/code/editor/extension/modules/subagent-stopping/subagent-stopping.module.code.ts"
  )

const AT = "/repo/agent/subagent/pages/amy-a70d67f8ee96115ae/amy-a70d67f8ee96115ae.subagent.ts"

const ROW = {
  key: "a70d67f8ee96115ae",
  label: "general-purpose",
  kind: "subagent",
  at: AT,
  stopped: false,
}

test("a running subagent's context value says so", () => {
  expect(subagentContextValue(false)).toBe("subagent.running")
})

test("a stopped subagent's context value says so", () => {
  expect(subagentContextValue(true)).toBe("subagent.stopped")
})

test("a subagent row is a target", () => {
  expect(invokedSubagent(ROW)?.id).toBe("a70d67f8ee96115ae")
})

test("a seat row is no target", () => {
  expect(invokedSubagent({ ...ROW, kind: "seat" })).toBeUndefined()
})

test("the top row is no target", () => {
  expect(
    invokedSubagent({ key: "root", label: "agents", kind: "root", at: null, stopped: false })
  ).toBeUndefined()
})

test("the page name is read off the page the row names", () => {
  const target = invokedSubagent(ROW)
  expect(target === undefined ? undefined : pageNameOf(target)).toBe("amy-a70d67f8ee96115ae")
})

test("a row naming no page names no page name", () => {
  const target = invokedSubagent({ ...ROW, at: null })
  expect(target === undefined ? "no target" : pageNameOf(target)).toBeUndefined()
})

test("a row naming a page of another kind names no page name", () => {
  const target = invokedSubagent({ ...ROW, at: "/repo/agent/seat/pages/nobody/nobody.seat.ts" })
  expect(target === undefined ? "no target" : pageNameOf(target)).toBeUndefined()
})

test("the confirmation names the page and the moment the stop reaches the subagent", () => {
  const prompt = confirmSubagentStop("amy-a70d67f8ee96115ae")
  expect(prompt.message).toContain("'amy-a70d67f8ee96115ae'")
  expect(prompt.detail).toContain("next model turn")
  expect(prompt.detail).toContain("that call finishes first")
  expect(prompt.confirm).toBe("Stop")
})

test("a stop asks the subagent-stop command by the page name", () => {
  expect(stopCall("amy-a70d67f8ee96115ae")).toEqual({
    slug: "agent-subagent-stop",
    exported: "agentSubagentStop",
    args: ["amy-a70d67f8ee96115ae"],
  })
})
