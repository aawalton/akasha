import { expect, test } from "bun:test"
import { pageStem, STEM_CEILING } from "../../../named-for/named-for.ts"
import { idDerivedFrom, idOfFilePage, slugOfFilePage } from "./naming.ts"

test("an id derived from a path is that path's uuid v5 under the oid namespace", () => {
  expect(idDerivedFrom("akasha:pages/domain/global.md")).toBe(
    "0d99ac38-e0ae-53c0-a70d-7ba995594622"
  )
  expect(idDerivedFrom("akasha:pages/seat/astra.md")).toBe("87da64f5-2a51-5c37-b8ab-4ba486cbbc88")
  expect(idDerivedFrom("akasha:pages/page-type/page.md")).toBe(
    "ed286b20-456d-58cf-87d2-9fb5ea336c38"
  )
  expect(idDerivedFrom("fixture:zoo/animals/tiger.md")).toBe(
    "a458038e-2647-5125-891e-0f13f0bbcd02"
  )
  expect(idDerivedFrom("fixture:zoo/kinds/page.md")).toBe("3908eaa8-3bb2-566c-9f65-1be8b6bc205a")
  expect(idDerivedFrom("memory:findings/abby-appearance/abby-and-talia-share-wording.md")).toBe(
    "2a1f48d7-6d49-5b8c-b84f-c4c9f5dfabd0"
  )
})

test("an id derived from a path spells a uuid v5, and another path takes another one", () => {
  expect(idDerivedFrom("fixture:zoo/animals/tiger.md")).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  )
  expect(idDerivedFrom("fixture:zoo/animals/tiger.md")).not.toBe(
    idDerivedFrom("fixture:zoo/animals/otter.md")
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
  expect(slugOfFilePage(null, "memory:temper/tasks/undaunted-skill-line.md")).toBe(
    "undaunted-skill-line"
  )
  expect(slugOfFilePage(null, "books:all-about-alan/topics/sleep.md")).toBe("sleep")
})

test("a stated slug stands over the stem it disagrees with", () => {
  expect(slugOfFilePage("held", "x:y/z.md")).toBe("held")
  expect(slugOfFilePage("stated-name", "memory:temper/tasks/file-name.md")).toBe("stated-name")
})

test("a slug is nothing where the address names no markdown file", () => {
  expect(slugOfFilePage(null, "akasha:pages/a.txt")).toBeNull()
  expect(slugOfFilePage(null, "memory:temper/completed-months/2026-08.tasks.jsonl#7")).toBeNull()
  expect(slugOfFilePage(null, null)).toBeNull()
})

test("a stem is lowercased, stripped of marks and bounded", () => {
  expect(pageStem("Alan’s Café — Notes!")).toBe("alans-cafe-notes")
  expect(pageStem("a".repeat(STEM_CEILING + 9))).toHaveLength(STEM_CEILING)
})
