import { expect, test } from "bun:test"
import { modelAccount } from "akasha/agent/model/account/model-account.page-type.ts"
import { aawalton } from "akasha/agent/model/account/pages/aawalton/aawalton.model-account.ts"
import { underOldKeys } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"

test("a registration account naming a model account is answered as the slug alone", () => {
  const values = underOldKeys({ registrationAccount: `${modelAccount.slug}/${aawalton.slug}` })
  expect(values["registration-account"]).toBe(aawalton.slug)
})

test("a registration account stated as a bare name is answered as that name", () => {
  const values = underOldKeys({ registrationAccount: aawalton.slug })
  expect(values["registration-account"]).toBe(aawalton.slug)
})
