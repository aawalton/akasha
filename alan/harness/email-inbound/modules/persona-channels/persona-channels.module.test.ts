import { expect, test } from "bun:test"
import { channelsOf } from "akasha/alan/harness/email-inbound/modules/persona-channels/persona-channels.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { personasStanding } from "akasha/persona/modules/reading/persona-reading.module.code.ts"

const ROOT = akashaRoot()

const channels = channelsOf(ROOT)

test("a persona's own address names that persona", () => {
  expect(channels.get("thea@alanwalton.com")).toBe("thea")
})

test("an address is lowercased before anything matches a header against it", () => {
  for (const address of channels.keys()) expect(address).toBe(address.toLowerCase())
})

test("a persona stating no email address is on no channel", () => {
  const named = new Set(channels.values())
  for (const persona of personasStanding(ROOT)) {
    expect(named.has(persona.slug)).toBe(persona.email !== null)
  }
})
