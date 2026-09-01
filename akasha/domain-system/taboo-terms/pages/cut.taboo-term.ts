import type { TabooTerm } from "../taboo-term.page-type.ts"

export const cut = {
  id: "01a0593e-da25-7703-adb2-91b00f924fc7",
  pageTypeSlug: "taboo-term",
  slug: "cut",
  pattern: "\\bcut\\b(?!\\s*[-(=<+,)])",
  tabooSenses: [{ sense: "creating anything", instead: "create" }],
} as const satisfies TabooTerm
