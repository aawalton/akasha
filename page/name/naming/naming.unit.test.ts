import { expect, test } from "bun:test"
import { idDerivedFrom, idOfFilePage, pageStem, slugOfFilePage, STEM_CEILING } from "./naming.ts"

test("an id derived from a path is that path's uuid v5 under the oid namespace", () => {
  expect(idDerivedFrom("akasha:pages/domain/global.md")).toBe(
    "0d99ac38-e0ae-53c0-a70d-7ba995594622"
  )
  expect(idDerivedFrom("akasha:pages/seat/astra.md")).toBe("87da64f5-2a51-5c37-b8ab-4ba486cbbc88")
  expect(idDerivedFrom("akasha:pages/page-type/page.md")).toBe(
    "ed286b20-456d-58cf-87d2-9fb5ea336c38"
  )
})

test("a page states its own id where it has one, and derives one where it does not", () => {
  expect(idOfFilePage("held", "akasha:pages/domain/global.domain.md")).toBe("held")
  expect(idOfFilePage(null, "akasha:pages/domain/global.domain.md")).toBe(
    idDerivedFrom("akasha:pages/domain/global.domain.md")
  )
})

test("a slug is the file stem where the page states none", () => {
  expect(slugOfFilePage(null, "akasha:pages/domain/global.domain.md")).toBe("global")
  expect(slugOfFilePage("held", "x:y/z.md")).toBe("held")
  expect(slugOfFilePage(null, "akasha:pages/a.txt")).toBeNull()
  expect(slugOfFilePage(null, null)).toBeNull()
})

test("a stem is lowercased, stripped of marks and bounded", () => {
  expect(pageStem("Alan’s Café — Notes!")).toBe("alans-cafe-notes")
  expect(pageStem("a".repeat(STEM_CEILING + 9))).toHaveLength(STEM_CEILING)
})
