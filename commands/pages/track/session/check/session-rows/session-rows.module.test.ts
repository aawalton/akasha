import { expect, test } from "bun:test"
import { RELATIONSHIP, saidEachFor, VALUED } from "./session-rows.module.code.ts"

test("the flag is one this command takes", () => {
  expect(VALUED).toContain(RELATIONSHIP)
})

test("a flag said with nothing after it names nothing", () => {
  expect(saidEachFor(["--relationship", "--json"], RELATIONSHIP)).toEqual([])
  expect(saidEachFor(["--relationship"], RELATIONSHIP)).toEqual([])
})
