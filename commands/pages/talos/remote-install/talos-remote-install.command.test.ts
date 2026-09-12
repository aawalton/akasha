import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type {
  Named,
  Reaching,
  Waiting,
} from "akasha/commands/pages/talos/remote-install/talos-remote-install.command.code.ts"
import {
  handedOver,
  handoverSaid,
} from "akasha/commands/pages/talos/remote-install/talos-remote-install.command.code.ts"

const READ: Named = {
  node: "one",
  ip: "10.0.0.7",
  sshUser: "alan",
  sshKey: "/nowhere/key",
  method: "dd",
  confirmWipe: true,
}

const SCRIPT = "exit 0\n"

const TIMED_OUT = "timed out after 1800000ms waiting for 10.0.0.7:50000"

const reaching: Reaching = async () => undefined

const refusing: Reaching = async () => {
  throw new OperationalError("the host would not take the script")
}

const waiting: Waiting = async () => {
  throw new OperationalError(TIMED_OUT)
}

test("the handover is named as soon as the host has taken the script", async () => {
  const done: string[] = []

  await expect(handedOver(READ, SCRIPT, reaching, waiting, done)).rejects.toThrow(TIMED_OUT)
  expect(done).toEqual([handoverSaid(READ)])
})

test("a run that threw after the handover names the handover in its refusal", async () => {
  const held = await answering(async (done) => {
    await handedOver(READ, SCRIPT, reaching, waiting, done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([handoverSaid(READ)])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("no longer running what it ran before")
})

test("a run that threw before the host took the script names no handover", async () => {
  const held = await answering(async (done) => {
    await handedOver(READ, SCRIPT, refusing, waiting, done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
