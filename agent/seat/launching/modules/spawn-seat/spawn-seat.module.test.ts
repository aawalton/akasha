import { expect, test } from "bun:test"
import { refuseUnstated } from "akasha/agent/seat/launching/modules/spawn-seat/spawn-seat.module.code.ts"

const NAME = "all-about-alan-recorder"

const SHORT_A_PERSONA = "a seat page needs a persona, a domain, a role and a principal"

const SHORT_A_PARENT = "a seat whose principal is no person needs the seat above it"

test("a spawn whose page was written is refused nothing", () => {
  expect(refuseUnstated(NAME, [])).toBeNull()
})

test("a spawn whose page was not written is refused, and the refusal names the seat", () => {
  const said = refuseUnstated(NAME, [SHORT_A_PERSONA])
  expect(said).not.toBeNull()
  expect(said).toContain(NAME)
})

test("the refusal carries why the page was not written", () => {
  expect(refuseUnstated(NAME, [SHORT_A_PERSONA])).toContain(SHORT_A_PERSONA)
})

test("every reason the page was not written is carried into the one refusal", () => {
  const said = refuseUnstated(NAME, [SHORT_A_PERSONA, SHORT_A_PARENT])
  expect(said).toContain(SHORT_A_PERSONA)
  expect(said).toContain(SHORT_A_PARENT)
})

test("the refusal says the spawn is refused before the seat boots", () => {
  const said = refuseUnstated(NAME, [SHORT_A_PERSONA])
  expect(said).toContain("refused before")
  expect(said).toContain("boots")
})
