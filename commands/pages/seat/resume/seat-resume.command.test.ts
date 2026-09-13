import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  noticeMissing,
  seatResume,
} from "akasha/commands/pages/seat/resume/seat-resume.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha seat resume", from: root, writer: null, agentId: null }
}

test("a resume naming no seat is refused", async () => {
  const said = await seatResume([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes `<name>`")
})

test("a resume given a flag where the seat goes is refused rather than reading it as a name", async () => {
  const said = await seatResume(["--prompt"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--prompt")
})

test("a resume carrying a flag it does not take is refused", async () => {
  const said = await seatResume(["athena", "--json"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--json")
})

test("a resume reading a flag past a value it does not take is refused", async () => {
  const said = await seatResume(
    ["athena", "--start-mode", "headless", "--verify"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--verify")
})

test("a resume reading --now past a value is taken rather than refused", async () => {
  const said = await seatResume(["athena", "--start-mode", "headless", "--now"], given("/nowhere"))
  expect(said.refusals[0] ?? "").not.toContain("--now")
})

test("a resume saying both a prompt and a notice is refused", async () => {
  const said = await seatResume(
    ["athena", "--prompt", "go on", "--notice", "editor-revive"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--notice")
})

test("a notice slug no page carries is refused naming the notices there are", () => {
  const said = noticeMissing("editor-revival", { "editor-revive": "come back", late: "" })
  expect(said).toContain("`editor-revival` names no notice")
  expect(said).toContain("editor-revive, late")
})
