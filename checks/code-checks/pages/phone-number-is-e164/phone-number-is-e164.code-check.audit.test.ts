import { afterAll, expect, test } from "bun:test"
import { phoneNumberIsE164 } from "./phone-number-is-e164.code-check.audit.code.ts"
import {
  AT,
  personText,
  scratch,
  tracked,
} from "./phone-number-is-e164.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = tracked({ [AT]: personText('phone: "6085122510"') })

  const said = phoneNumberIsE164(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain('"6085122510"')
})

test("an audit lets through a tree whose every number is written in E.164", () => {
  const root = tracked({ [AT]: personText('phone: "+16085122510"') })

  expect(phoneNumberIsE164(root)).toEqual([])
})
