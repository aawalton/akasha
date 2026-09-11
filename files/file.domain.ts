import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const file = {
  id: "01a049e9-651c-7004-a164-c9c8df818b18",
  type: "domain",
  slug: "file",
  definition: "a file in the `akasha` folder",
  pluralSlug: "files",
  parts: [
    "domain/folder-path",
    "module/answer-mark",
    "module/git-place",
    "module/exclusive",
    "module/lock-holder",
    "module/lock-holder-runs",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's file is named for its slug and its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page property's file is named for its page and its property.",
    },
    {
      invariantKind: "departure",
      statement: "Every file is a page or one page property's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A file git does not track sits in the folder all the same.",
    },
    {
      invariantKind: "departure",
      statement: "Two processes take turns over one file rather than writing it at once.",
    },
  ],
} as const satisfies Domain
