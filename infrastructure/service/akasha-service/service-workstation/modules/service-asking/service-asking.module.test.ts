import { expect, test } from "bun:test"
import { asked } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-asking/service-asking.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-installing/service-installing.module.code.ts"

const RELOAD: readonly string[] = ["daemon-reload"]

test("a call that answers is handed back as that call answered", () => {
  const calls: (readonly string[])[] = []
  const run = (args: readonly string[]): Ran => {
    calls.push([...args])
    return { code: 0, out: "" }
  }

  expect(asked(run, RELOAD)).toEqual({ code: 0, out: "" })
  expect(calls).toEqual([RELOAD])
})

test("a call that throws is answered as a code no run of systemctl gives", () => {
  const thrown = (): Ran => {
    throw new Error("dbus went away mid-start")
  }

  const said = asked(thrown, RELOAD)

  expect(said.code).not.toBe(0)
  expect(said.out).toContain("dbus went away")
})
