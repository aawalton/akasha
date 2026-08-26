import { expect, test } from "bun:test"
import { idDerivedFrom, idOfFilePage, pageStem, slugOfFilePage, STEM_CEILING } from "./naming.ts"

test("an id derived from a path is that path's uuid v5 under the oid namespace", () => {
  expect(idDerivedFrom("instructions:pages/domain/global.md")).toBe(
    "77b6c39f-60dc-5da6-bb37-190c576947af"
  )
  expect(idDerivedFrom("memory:pages/seat/astra.md")).toBe("97fe1b09-7d55-5c7e-afd9-4ab6a1f38076")
  expect(idDerivedFrom("instructions:pages/page-type/page.md")).toBe(
    "0e48ff29-e43e-5041-93aa-a2d0ea16f0e2"
  )
})

test("a page states its own id where it has one, and derives one where it does not", () => {
  expect(idOfFilePage("held", "instructions:pages/domain/global.domain.md")).toBe("held")
  expect(idOfFilePage(null, "instructions:pages/domain/global.domain.md")).toBe(
    idDerivedFrom("instructions:pages/domain/global.domain.md")
  )
})

test("a slug is the file stem where the page states none", () => {
  expect(slugOfFilePage(null, "instructions:pages/domain/global.domain.md")).toBe("global")
  expect(slugOfFilePage("held", "x:y/z.md")).toBe("held")
  expect(slugOfFilePage(null, "instructions:pages/a.txt")).toBeNull()
  expect(slugOfFilePage(null, null)).toBeNull()
})

test("a stem is lowercased, stripped of marks and bounded", () => {
  expect(pageStem("Alan’s Café — Notes!")).toBe("alans-cafe-notes")
  expect(pageStem("a".repeat(STEM_CEILING + 9))).toHaveLength(STEM_CEILING)
})
