import { describe, expect, test } from "bun:test"
import { handleKey, normalizePhone } from "./contacts-db"

describe("normalizePhone", () => {
  test("strips every non-digit character", () => {
    expect(normalizePhone("+1 (801) 376-6506")).toBe("18013766506")
    expect(normalizePhone("+18016444536")).toBe("18016444536")
    expect(normalizePhone("608.512.2511")).toBe("6085122511")
  })

  test("returns empty string for digit-free input", () => {
    expect(normalizePhone("not a number")).toBe("")
  })
})

describe("handleKey", () => {
  test("matches differently-formatted US numbers on the last 10 digits", () => {
    expect(handleKey("+1 (801) 376-6506")).toBe(handleKey("8013766506"))
    expect(handleKey("+16085122511")).toBe("6085122511")
  })

  test("matches emails case-insensitively", () => {
    expect(handleKey("Foo@Example.COM")).toBe(handleKey("foo@example.com"))
  })

  test("keeps short numbers (under 10 digits) whole", () => {
    expect(handleKey("865-87")).toBe("86587")
  })
})
