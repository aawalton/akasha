import { describe, expect, test } from "bun:test"
import { GRANDFATHERED_FILES, isGrandfathered } from "./check-client-page-access-boundary.ts"

const USE_TEMPER_IMPORT = "temper/web/app/components/import/use-temper-import.ts"

describe("client-page-access allowlist — empty + enforcing (#8847 resolved)", () => {
  test("the allowlist is empty — zero grandfathering", () => {
    expect(GRANDFATHERED_FILES.length).toBe(0)
  })

  test("the former temper baseline file is no longer grandfathered", () => {
    expect(isGrandfathered(USE_TEMPER_IMPORT)).toBe(false)
  })

  test("an arbitrary browser file is NOT grandfathered", () => {
    expect(
      isGrandfathered("temper/web/app/components/characters/characters-data-content.tsx")
    ).toBe(false)
  })
})
