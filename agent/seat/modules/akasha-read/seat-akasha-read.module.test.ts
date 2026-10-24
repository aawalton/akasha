import { expect, test } from "bun:test"
import { modelAccount } from "akasha/agent/model/account/model-account.page-type.ts"
import { aawalton } from "akasha/agent/model/account/pages/aawalton/aawalton.model-account.ts"
import { underOldKeys } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"
import { person } from "akasha/person/person.page-type.ts"

test("a registration account naming a model account is answered as the slug alone", () => {
  const values = underOldKeys({ registrationAccount: `${modelAccount.slug}/${aawalton.slug}` })
  expect(values["registration-account"]).toBe(aawalton.slug)
})

test("a registration account stated as a bare name is answered as that name", () => {
  const values = underOldKeys({ registrationAccount: aawalton.slug })
  expect(values["registration-account"]).toBe(aawalton.slug)
})

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const JENNY_AT = `${person.slug}/${jenny.slug}` as const

test("a seat's persons are answered as one principal under the person key", () => {
  expect(underOldKeys({ persons: [ALAN_AT] })["person-slug"]).toBe(alan.slug)
  expect(underOldKeys({ persons: [ALAN_AT, JENNY_AT] })["person-slug"]).toBe(
    `${alan.slug},${jenny.slug}`
  )
  expect(underOldKeys({ persons: [] })["person-slug"]).toBeUndefined()
})

test("a page from history stating one person is read by that person", () => {
  expect(underOldKeys({ person: ALAN_AT })["person-slug"]).toBe(alan.slug)
})
