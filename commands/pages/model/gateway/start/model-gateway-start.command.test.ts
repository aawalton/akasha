import { expect, test } from "bun:test"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  modelGatewayStart,
  wrongIn,
} from "akasha/commands/pages/model/gateway/start/model-gateway-start.command.code.ts"
import type { RunSeams } from "akasha/commands/pages/model/gateway/start/proxy-run/proxy-run.module.code.ts"

const LOG_AT = "/var/tmp/run/akasha-gateway-under-test"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha model gateway start",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function printingNoPort(): RunSeams {
  return {
    seatOf: () => null,
    madeDir: (): undefined => undefined,
    spawned: () => ({
      pid: 4242,
      outOf: () => undefined,
      loosed: (): undefined => undefined,
      stopped: (): undefined => undefined,
    }),
    ported: () => Promise.reject(new Error("timed out waiting for port")),
    socketFor: (agentId) => `/var/tmp/run/akasha-${agentId}.sock`,
    logDirFor: () => LOG_AT,
  }
}

test("a gateway that printed no port is refused with its log directory named", async () => {
  const held = await modelGatewayStart(["--log-dir", LOG_AT], GIVEN, printingNoPort())

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals[0]).toContain("printed no port")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(LOG_AT)
  expect(held.report.join(" ")).toContain(LOG_AT)
})

test("a gateway stopped again is not named as still running", async () => {
  const held = await modelGatewayStart(["--log-dir", LOG_AT], GIVEN, printingNoPort())

  expect(held.refusals.join(" ")).not.toContain("kill 4242")
  expect(held.report.join(" ")).not.toContain("kill 4242")
})

test("a word this does not take is refused at the caller with nothing reported", async () => {
  const held = await modelGatewayStart(["--nonsense"], GIVEN, printingNoPort())

  expect(held.code).toBe(INPUT)
  expect(held.report).toEqual([])
})

test("a port above the highest one there is is refused", () => {
  expect(wrongIn({ keep: false, gatewayPort: 65536 })).toEqual(["`--port 65536` is over 65535"])
})

test("a port at the highest one there is is taken", () => {
  expect(wrongIn({ keep: false, gatewayPort: 65535 })).toEqual([])
})

test("an account named as nothing is refused rather than taken as the default", () => {
  expect(wrongIn({ keep: false, registrationAccount: "" })).toEqual([
    "`--account` takes a name and an empty one came",
  ])
})

test("a version named as nothing is refused rather than taken as the default", () => {
  expect(wrongIn({ keep: false, version: "" })).toEqual([
    "`--version` takes a name and an empty one came",
  ])
})
