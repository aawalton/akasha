import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { decodeAttributedBody } from "./typedstream"

const FIXTURE_SCHEMA = z.string()

function fixtureHex(name: string): string {
  return FIXTURE_SCHEMA.parse(readFileSync(join(import.meta.dir, "fixtures", name), "utf8")).trim()
}

describe("decodeAttributedBody", () => {
  test("decodes a long-form (uint16 length) message body", () => {
    expect(decodeAttributedBody(fixtureHex("attributed-body-100598.hex.txt"))).toBe(
      "Yes, I was gonna let you know. Nick is in town so he reached out to see if Family wanted to get together and talk about going out, but I offered to host here so I thought that would give a better chance for people to choose to come or not."
    )
  })

  test("decodes a short-form (single-byte length) message body", () => {
    expect(decodeAttributedBody(fixtureHex("attributed-body-100599.hex.txt"))).toBe(
      "Also, how are you doing this morning? How did you sleep?"
    )
  })

  test("returns the FIRST string payload, not later attribute-name payloads", () => {
    expect(decodeAttributedBody(fixtureHex("attributed-body-100596.hex.txt"))).toBe("�")
  })

  test("returns undefined when no NSString marker is present", () => {
    expect(decodeAttributedBody("")).toBeUndefined()
    expect(decodeAttributedBody("DEADBEEF")).toBeUndefined()
  })
})
