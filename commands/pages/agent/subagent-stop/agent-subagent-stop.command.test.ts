import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pathIn } from "akasha/agents/subagents/modules/page-naming/subagent-page-naming.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  agentSubagentStop,
  stoppedAlready,
} from "akasha/commands/pages/agent/subagent-stop/agent-subagent-stop.command.code.ts"
import { uncommittedIn } from "akasha/pages/modules/uncommitted/page-uncommitted.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

const NAME = "athena-a0123456789abcdef"

function given(root: string): Given {
  return { root, calledAs: "akasha agent subagent-stop", from: root, writer: null, agentId: null }
}

function rootWithPage(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "amy-subagent-stop-"))
  const at = join(root, pathIn(root, NAME))
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, `export const page = { type: "subagent", slug: "${NAME}" } as const\n`)
  return root
}

test("a stop naming no subagent is refused", () => {
  const said = agentSubagentStop([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes `<name>`")
})

test("a stop carrying a flag it does not take is refused", () => {
  const said = agentSubagentStop([NAME, "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a name no subagent holds a page for is a data refusal", () => {
  const said = agentSubagentStop(["nobody-here"], given("/nowhere"))
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("nobody-here")
})

test("a stop is written beside the subagent's page", () => {
  const root = rootWithPage()
  try {
    const said = agentSubagentStop([NAME], given(root))
    expect(said.code).toBe(0)
    expect(said.report[0]).toContain("is stopped")
    expect(said.report[0]).toContain("next model turn")
    expect(uncommittedIn(root, pathIn(root, NAME))?.stopped).toBe(true)
    expect(stoppedAlready(root, pathIn(root, NAME))).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a subagent stopped already is left as it is, and the run says so", () => {
  const root = rootWithPage()
  try {
    agentSubagentStop([NAME], given(root))
    const said = agentSubagentStop([NAME], given(root))
    expect(said.code).toBe(0)
    expect(said.report[0]).toContain("already")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page nobody stopped is not stopped already", () => {
  const root = rootWithPage()
  try {
    expect(stoppedAlready(root, pathIn(root, NAME))).toBe(false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
