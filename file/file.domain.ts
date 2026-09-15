import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const file = {
  id: "01a049e9-651c-7004-a164-c9c8df818b18",
  type: "page-type/domain",
  slug: "file",
  definition: "a file in the `akasha` folder",
  parts: [
    "domain/file-disk",
    "domain/folder-path",
    "module/exclusive",
    "module/git-place",
    "module/lock-holder",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's file is named for its slug and its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page property's file is named for its page and its property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file is a page or one page property's own file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file git does not track sits in the folder all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two processes take turns over one file rather than writing it at once.",
    },
  ],
} as const satisfies Domain
