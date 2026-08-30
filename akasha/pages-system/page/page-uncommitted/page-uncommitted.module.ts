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
        "These values are written here rather than by a landing, so a change to them takes no repository hold and makes no commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "The gate refuses a file no page claims, and no page claims this one, so nothing writes it by a landing even meaning to.",
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
      invariantKind: "departure",
      statement:
        "Every write takes a lock keyed on the file it writes, so writers to one page take turns and writers to different pages never wait on one another.",
    },
    {
      invariantKind: "departure",
      statement:
        "The lock is a `.lock` directory beside the file, taken by one create that fails where it already stands, and released however the act inside it ends.",
    },
    {
      invariantKind: "departure",
      statement: "Git ignores every `.lock`, so no lock a writer takes is ever committed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The lock names the process that took it and the moment that process started, and a lock whose holder is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lock naming no holder that can be read is taken once it has stood too long, so a mark nobody wrote wedges nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Values merge key by key into what stands, so writers owning different keys of one page never lose one another's.",
    },
    {
      invariantKind: "departure",
      statement:
        "Dropping names the keys to take away, and taking the whole file away is its own act under its own name, so neither is read as the other.",
    },
    {
      invariantKind: "absence",
      statement:
        "A reader takes no lock, because a write lands whole by rename, so no reader ever waits on a writer or holds one up.",
    },
  ],
} as const satisfies Module
