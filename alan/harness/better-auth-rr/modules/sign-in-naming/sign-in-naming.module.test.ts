import { describe, expect, test } from "bun:test"
import {
  contributorNamedAs,
  contributorSlugFor,
  emailHashOf,
  hashOf,
  signInSlugFor,
  subjectHashOf,
} from "akasha/alan/harness/better-auth-rr/modules/sign-in-naming/sign-in-naming.module.code.ts"

const EMPTY_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

const ADDRESS_HASH = "61356ceff7537431960452071a97f980415f71b0ce1ab92da45f5b5a41277d26"

const SUBJECT = "117294628302041231234"

const SUBJECT_HASH = "192d76d86b356f72db4e2adf8fd43db2a59c36f0edcb7cc656d6a9830e62526f"

describe("sign-in naming", () => {
  test("writes a sha-256 as sixty-four characters of lower hex", async () => {
    expect(await hashOf("")).toBe(EMPTY_HASH)
  })

  test("hashes what a provider calls a person as that provider wrote it", async () => {
    expect(await subjectHashOf(SUBJECT)).toBe(SUBJECT_HASH)
  })

  test("lowercases an address before hashing it", async () => {
    expect(await emailHashOf("Alan@Example.COM")).toBe(ADDRESS_HASH)
    expect(await emailHashOf("alan@example.com")).toBe(ADDRESS_HASH)
  })

  test("leaves an address unchanged but for its case", async () => {
    expect(await emailHashOf(" alan@example.com")).not.toBe(ADDRESS_HASH)
  })

  test("names a sign-in by its provider and its subject hash", () => {
    expect(signInSlugFor("google", SUBJECT_HASH)).toBe(`google-${SUBJECT_HASH}`)
  })

  test("names a contributor by its address hash", () => {
    expect(contributorSlugFor(ADDRESS_HASH)).toBe(`contributor-${ADDRESS_HASH}`)
  })

  test("addresses a contributor by its page type and its name", () => {
    expect(contributorNamedAs(`contributor-${ADDRESS_HASH}`)).toBe(
      `contributor/contributor-${ADDRESS_HASH}`
    )
  })
})
