import { expect, test } from "bun:test"
import { fileStemOf, pageNameOf, pageStemOf } from "./name.ts"

test("a page stem is everything before the page type, dots included", () => {
  expect(pageStemOf("pages/domain/global.domain.md")).toBe("global")
  expect(pageStemOf("account.account-achievements.temper-completion-category.md")).toBe(
    "account.account-achievements"
  )
  expect(pageStemOf("alan@example.com.audhdalan-subscriber.md")).toBe("alan@example.com")
})

test("a file that carries no page type has no page stem, and asking is refused", () => {
  expect(() => pageStemOf("repoint/link.ts")).toThrow()
  expect(() => pageStemOf("pages/domain/global.md")).toThrow()
  expect(() => pageStemOf(".domain.md")).toThrow()
})

test("a file stem is the name before its file suffixes, which start at the first period", () => {
  expect(fileStemOf("repoint/link.ts")).toBe("link")
  expect(fileStemOf("pages/domain/global.domain.md")).toBe("global")
  expect(fileStemOf("dirty/2026-08-27-note.md")).toBe("2026-08-27-note")
  expect(fileStemOf("account.account-achievements.temper-completion-category.md")).toBe("account")
  expect(fileStemOf(".gitignore")).toBe(".gitignore")
})

test("a name whose only period opens it carries no page type", () => {
  expect(pageNameOf(".domain.md")).toBeNull()
})
