import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { entry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.test-fixtures.ts"
import { pathIn } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { stoppedBeside } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { agentSubagentStop } from "akasha/command/pages/agent/subagent-stop/agent-subagent-stop.command.code.ts"
import type { RunningSaid } from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const OWN = "a0123456789abcdef"

const NAME = `athena-${OWN}`

const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const OTHER_ID = "01a05844-6e60-7000-b54c-4b14559df70c"

const ACTING = `${SEAT_ID}--${OWN}`

const CHILD = "claude --dangerously-skip-permissions --model opus"

const noSaid: RunningSaid = () =>
  Promise.resolve({ running: new Set(), ended: new Set(), outlived: new Set() })

const COMMIT = "1111111111111111111111111111111111111111"

function landings() {
  const asked: unknown[] = []
  const landing: Landing = (_root, changes, _message, writing) => {
    asked.push(changes)
    writing?.done?.push(COMMIT)
    return Promise.resolve({
      base: "0".repeat(40),
      landed: [],
      formatted: [],
      said: [],
      wrong: [],
      commit: COMMIT,
    })
  }
  return { asked: () => asked, landing }
}

function given(root: string): Given {
  return { root, calledAs: "akasha agent subagent-stop", from: root, writer: null, agentId: null }
}

function rootWithPage(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "amy-subagent-stop-"))
  const at = pathIn(root, NAME)
  mkdirSync(join(root, at, ".."), { recursive: true })
  writeFileSync(
    join(root, at),
    `export const page = { pageTypeSlug: "subagent", slug: "${NAME}" } as const\n`
  )
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug: NAME } }])
  return root
}

function rootFiled(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "amy-subagent-stop-"))
  const at = pathIn(root, NAME)
  mkdirSync(join(root, at, ".."), { recursive: true })
  writeFileSync(
    join(root, at),
    [
      "export const page = {",
      '  pageTypeSlug: "subagent",',
      `  slug: ${JSON.stringify(NAME)},`,
      '  principalSeatName: "seat/athena",',
      '  assignmentSlug: "domain/akasha",',
      '  dispatchedAs: "Explore",',
      `  agentId: ${JSON.stringify(ACTING)},`,
      "} as const",
      "",
    ].join("\n")
  )
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug: NAME } }])
  return root
}

function stopping(root: string, seen: readonly ProcLivenessEntry[]) {
  const held = landings()
  const base = mkdtempSync(join(SCRATCH_AT, "amy-subagent-stop-logs-"))
  return {
    held,
    said: agentSubagentStop([NAME], given(root), seen, base, noSaid, held.landing),
  }
}

test("a stop naming no subagent is refused", async () => {
  const said = await agentSubagentStop([], given("/nowhere"), [])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes `<name>`")
})

test("a stop carrying a flag it does not take is refused", async () => {
  const said = await agentSubagentStop([NAME, "--wat"], given("/nowhere"), [])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a name no subagent holds a page for is a data refusal", async () => {
  const said = await agentSubagentStop(["nobody-here"], given("/nowhere"), [])
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toContain("nobody-here")
})

test("a stop is written beside the subagent's page", async () => {
  const root = rootWithPage()
  try {
    const said = await agentSubagentStop([NAME], given(root), [], undefined, noSaid)
    expect(said.code).toBe(0)
    expect(said.report[0]).toContain("is stopped")
    expect(said.report[0]).toContain("next model turn")
    expect(uncommittedIn(root, pathIn(root, NAME))?.stopped).toBe(true)
    expect(stoppedBeside(root, pathIn(root, NAME))).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a subagent stopped already is left as it is, and the run says so", async () => {
  const root = rootWithPage()
  try {
    await agentSubagentStop([NAME], given(root), [], undefined, noSaid)
    const said = await agentSubagentStop([NAME], given(root), [], undefined, noSaid)
    expect(said.code).toBe(0)
    expect(said.report[0]).toContain("already")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page nobody stopped is not stopped already", () => {
  const root = rootWithPage()
  try {
    expect(stoppedBeside(root, pathIn(root, NAME))).toBe(false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page the census judges stale is stopped and its page goes at once", async () => {
  const root = rootFiled()
  try {
    const { held, said } = stopping(root, [entry({ agentId: OTHER_ID, cmdline: CHILD, pid: 8 })])
    const answer = await said
    expect(answer.code).toBe(0)
    expect(answer.report.join("\n")).toContain("its page went")
    expect(answer.report.join("\n")).toContain("no process at all carries its seat's agent id")
    expect(held.asked().length).toBe(1)
    expect(stoppedBeside(root, pathIn(root, NAME))).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page a live process acts under is stopped and keeps its page", async () => {
  const root = rootFiled()
  try {
    const { held, said } = stopping(root, [
      entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: CHILD, pid: 9 }),
    ])
    const answer = await said
    expect(answer.report[0]).toContain("next model turn")
    expect(held.asked()).toEqual([])
    expect(existsSync(join(root, pathIn(root, NAME)))).toBe(true)
    expect(stoppedBeside(root, pathIn(root, NAME))).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the census is taken before the stop, so the stop never makes the page stale", async () => {
  const root = rootFiled()
  try {
    const { held, said } = stopping(root, [entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 9 })])
    const answer = await said
    expect(answer.report[0]).toContain("next model turn")
    expect(held.asked()).toEqual([])
    expect(existsSync(join(root, pathIn(root, NAME)))).toBe(true)
    expect(stoppedBeside(root, pathIn(root, NAME))).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
