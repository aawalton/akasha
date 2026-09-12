import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureServiceSweep } from "akasha/commands/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service sweep",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("naming a service is refused as the caller's fault", () => {
  const answer = infrastructureServiceSweep(["pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("every unit akasha owns")
})

test("a flag this does not take is refused by name", () => {
  const answer = infrastructureServiceSweep(["--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a dry run asks systemd nothing and plans no unit written or enabled", () => {
  const answer = infrastructureServiceSweep(["--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  for (const line of answer.report) expect(line).not.toContain("write\t")
  for (const line of answer.report) expect(line).not.toContain("enable\t")
})

test("of each unit it says only that it is to be removed or that it is stranded", () => {
  const answer = infrastructureServiceSweep(["--dry-run"], HERE)
  expect(answer.code).toBe(0)
  const said = ["nothing\t", "remove\t", "stranded\t", "dry-run\t"]
  for (const line of answer.report) expect(said.some((one) => line.startsWith(one))).toBe(true)
})
