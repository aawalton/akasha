import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageUncommitted = {
  id: "01a05010-1cbe-76ec-a6bf-c455bdde23b5",
  pageTypeSlug: "module",
  slug: "page-uncommitted",
  definition: "the values a page carries that the commit does not hold",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page's uncommitted values stand in one file beside it, written and read as a page's own values are, so one loader answers both.",
    },
    {
      invariantKind: "departure",
      statement:
        "The file is replaced by writing a scratch file beside it and renaming it over, so a reader sees the values as they stood before a write or after it, never during.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page with no file beside it carries no uncommitted values, which is an answer rather than a failure to read one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that stands but will not load, or loads declaring nothing, is refused rather than read as empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The exported name carries the page's own name, so a file opened on its own says which page it stands beside.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here takes a lock. Two writers racing lose one another's values, though neither can be read half written.",
    },
  ],
} as const satisfies Module
