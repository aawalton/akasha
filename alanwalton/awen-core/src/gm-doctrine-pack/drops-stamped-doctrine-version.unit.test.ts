import { describe, expect, test } from "bun:test"
import { dropsStampedDoctrineVersion, withDoctrinePack } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("dropsStampedDoctrineVersion — the merge-seam guard predicate (#15233)", () => {
  const SEEDED = withDoctrinePack(undefined, FIXTURE_PACK)

  test("current stamped, next unstamped ⇒ true (the silent-strip the guard refuses)", () => {
    expect(dropsStampedDoctrineVersion(SEEDED, { policies: [] })).toBe(true)
  })

  test("current stamped, next stamped ⇒ false (preservation kept it)", () => {
    expect(dropsStampedDoctrineVersion(SEEDED, SEEDED)).toBe(false)
  })

  test("current pre-pack (no stamp) ⇒ false — a game that never carried a version can't drop one", () => {
    expect(dropsStampedDoctrineVersion({ policies: [] }, { policies: [] })).toBe(false)
    expect(dropsStampedDoctrineVersion(undefined, undefined)).toBe(false)
    expect(dropsStampedDoctrineVersion(null, null)).toBe(false)
  })
})
