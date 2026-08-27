import { describe, expect, test } from "bun:test"
import { GmDoctrinePackSchema, parseDoctrinePack } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("GmDoctrinePackSchema / parseDoctrinePack — strict boundary parse", () => {
  test("a valid pack parses", () => {
    expect(parseDoctrinePack(FIXTURE_PACK)).toEqual(FIXTURE_PACK)
  })

  test("an unknown top-level key is rejected (strict)", () => {
    expect(() => parseDoctrinePack({ ...FIXTURE_PACK, extra: 1 })).toThrow()
  })

  test("a negative doctrineVersion is rejected", () => {
    expect(GmDoctrinePackSchema.safeParse({ ...FIXTURE_PACK, doctrineVersion: -1 }).success).toBe(
      false
    )
  })

  test("a malformed policy is rejected", () => {
    expect(
      GmDoctrinePackSchema.safeParse({
        ...FIXTURE_PACK,
        policies: [{ id: "doctrine:x" }],
      }).success
    ).toBe(false)
  })
})
