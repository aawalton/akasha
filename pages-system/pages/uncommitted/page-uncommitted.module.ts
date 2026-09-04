import type { Module } from "@akasha/code-system/module"

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
      statement: "A page's uncommitted values sit in the file whose only section is `uncommitted`.",
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
      statement: "A replacement keeps the mode the replaced file already had.",
    },
    {
      invariantKind: "departure",
      statement: "A file written where no file was there takes the mode the umask gives.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page no file sits beside carries no uncommitted values rather than failing to read the values.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that will not load or loads declaring nothing is refused rather than read as empty.",
    },
    {
      invariantKind: "departure",
      statement: "The exported name carries the page's own name.",
    },
    {
      invariantKind: "departure",
      statement: "Every write takes a lock keyed on the file that write writes.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is a `.lock` directory beside the file.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is taken by one create that fails where the lock already stands.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is released however the act inside the lock ends.",
    },
    {
      invariantKind: "departure",
      statement: "Git ignores every `.lock`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The lock names the process that took the lock and the moment that process started.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lock naming no holder that can be read is taken once that lock has stood too long.",
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
      invariantKind: "departure",
      statement:
        "A page's whole value merges the uncommitted values into the values the commit holds.",
    },
    {
      invariantKind: "departure",
      statement: "A key held both ways is answered as the uncommitted value.",
    },
    {
      invariantKind: "departure",
      statement: "A file already read is read again once its moment or its size has changed.",
    },
    {
      invariantKind: "absence",
      statement: "A reader takes no lock.",
    },
  ],
} as const satisfies Module
