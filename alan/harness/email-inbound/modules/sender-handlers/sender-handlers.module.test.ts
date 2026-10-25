import { expect, test } from "bun:test"
import { handlersOf } from "akasha/alan/harness/email-inbound/modules/sender-handlers/sender-handlers.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { personOr } from "akasha/person/modules/reading/person-reading.module.code.ts"

const ROOT = akashaRoot()

const handlers = handlersOf(ROOT)

test("the seat a sender's mail is handed to is named for the person the target names", () => {
  expect(handlers.get("smilingjenny@gmail.com")).toBe("jenny")
})

test("an address is lowercased before anything matches a sender against it", () => {
  for (const address of handlers.keys()) expect(address).toBe(address.toLowerCase())
})

test("a relationship naming no email handler target hands no mail to a seat", () => {
  const alan = personOr(ROOT, "alan").email
  expect(alan).not.toBe(null)
  expect(handlers.has((alan ?? "").toLowerCase())).toBe(false)
  expect(handlers.has("rick@rickwalton.com")).toBe(false)
})
