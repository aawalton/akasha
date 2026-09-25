import { expect, test } from "bun:test"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

test("a refusal the caller brought on is answered as a bad request", () => {
  expect(STATUS_FOR.caller).toBe(400)
})

test("a refusal the service brought on is answered as the service's own failure", () => {
  expect(STATUS_FOR.service).toBe(500)
})

test("a refusal a race brought on is answered as a conflict, which may be sent again", () => {
  expect(STATUS_FOR.race).toBe(409)
})
