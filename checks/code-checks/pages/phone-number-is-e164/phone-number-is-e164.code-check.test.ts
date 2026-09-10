import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { phoneNumberIsE164 } from "./phone-number-is-e164.code-check.code.ts"
import {
  AT,
  person,
  rooted,
  scratch,
} from "./phone-number-is-e164.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(
  root: string,
  files: Readonly<Record<string, Uint8Array | null>>
): readonly Judged[] {
  const change = landing(root, files)
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return phoneNumberIsE164(change, cast.shadow)
}

test("the check refuses a page the change carries whose number is off E.164", () => {
  const said = judged(rooted(), { [AT]: person('phone: "6085122510"') })

  expect(said.map((one) => one.path)).toEqual([AT])
})

test("the check lets through a page whose number is written in E.164", () => {
  expect(judged(rooted(), { [AT]: person('phone: "+16085122510"') })).toEqual([])
})

test("the check takes a page as its input and no file that is no page", () => {
  const change = landing(rooted(), { [AT]: person('phone: "+16085122510"') })
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(phoneNumberIsE164.isInput(AT, cast.shadow)).toBe(true)
  expect(phoneNumberIsE164.isInput("akasha/held.ts", cast.shadow)).toBe(false)
})
