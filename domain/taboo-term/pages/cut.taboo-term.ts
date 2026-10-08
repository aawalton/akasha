import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const cut = {
  id: "01a0593e-da25-7703-adb2-91b00f924fc7",
  type: "page-type/taboo-term",
  slug: "cut",
  pattern: "\\bcut\\b(?!\\s*[-(=<+,)])",
  tabooSenses: [{ sense: "creating anything", instead: "create" }],
  createdAt: "2026-08-31T19:14:46.437Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
