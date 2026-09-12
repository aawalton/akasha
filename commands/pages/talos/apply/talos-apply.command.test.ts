import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Applied,
  Keeping,
  Running,
} from "akasha/commands/pages/talos/apply/talos-apply.command.code.ts"
import {
  readIn,
  tookSaid,
  wroteConfig,
} from "akasha/commands/pages/talos/apply/talos-apply.command.code.ts"

const APPLIED: Applied = {
  cluster: "home",
  node: "one",
  file: "controlplane.yaml",
  ip: "10.0.0.7",
  workDir: "/nowhere/work",
  gen: ["gen", "config"],
  apply: ["apply-config"],
}

const PERSISTED = "/nowhere/home/talosconfig"

const WROTE = `wrote the talosconfig to ${PERSISTED}`

const keeping: Keeping = async () => PERSISTED

function running(upTo: number): Running {
  let reached = 0
  return async (call) => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`talosctl ${call.args[0]} failed`)
    return undefined
  }
}

test("a node named twice is refused", () => {
  expect("refused" in readIn(["one", "--node", "two", "--ip", "10.0.0.7"])).toBe(true)
})

test("the talosconfig and the node are each named as soon as each is written", async () => {
  const done: string[] = []

  await wroteConfig(APPLIED, running(2), keeping, done)
  expect(done).toEqual([WROTE, tookSaid(APPLIED)])
})

test("an apply that threw part way names in its refusal what it had written", async () => {
  const held = await answering(async (done) => {
    await wroteConfig(APPLIED, running(1), keeping, done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([WROTE])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(PERSISTED)
  expect(last).not.toContain("no longer running what it ran before")
})

test("an apply that threw before the talosconfig was written names nothing", async () => {
  const held = await answering(async (done) => {
    await wroteConfig(APPLIED, running(0), keeping, done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
