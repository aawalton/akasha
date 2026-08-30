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
      statement: "A page's uncommitted values stand in one file beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A page's uncommitted values are written and read as a page's own values are.",
    },
    {
      invariantKind: "departure",
      statement: "These values are written here rather than by a landing.",
    },
    {
      invariantKind: "departure",
      statement: "The gate refuses a file no page claims.",
    },
    {
      invariantKind: "departure",
      statement: "No page claims this one.",
    },
    {
      invariantKind: "departure",
      statement: "The file is replaced by writing a scratch file beside it and renaming it over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page with no file beside it carries no uncommitted values which is an answer rather than a failure to read one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that stands but will not load or loads declaring nothing is refused rather than read as empty.",
    },
    {
      invariantKind: "departure",
      statement: "The exported name carries the page's own name.",
    },
    {
      invariantKind: "departure",
      statement: "Every write takes a lock keyed on the file it writes.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is a `.lock` directory beside the file.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is taken by one create that fails where it already stands.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is released however the act inside it ends.",
    },
    {
      invariantKind: "departure",
      statement: "Git ignores every `.lock`.",
    },
    {
      invariantKind: "departure",
      statement: "The lock names the process that took it and the moment that process started.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A lock naming no holder that can be read is taken once it has stood too long.",
    },
    {
      invariantKind: "departure",
      statement: "Values merge key by key into what stands.",
    },
    {
      invariantKind: "departure",
      statement: "Dropping names the keys to take away.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the whole file away is its own act under its own name.",
    },
    {
      invariantKind: "absence",
      statement: "A reader takes no lock.",
    },
  ],
} as const satisfies Module
