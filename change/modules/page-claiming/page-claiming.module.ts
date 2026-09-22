import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageClaiming = {
  id: "01a078bd-ae49-7881-bdf5-084ad0327dbe",
  type: "page-type/module",
  slug: "page-claiming",
  definition: "the files a page claims, read through the world a change reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's own file leads the files answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the page claims that has no body is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is kept for holding a body rather than for holding text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with a body that is not text is answered beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file beside the page whose ending a property of the page names is answered too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file under a folder beneath the page's own folder is no such file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path claimed twice is answered once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world is read rather than the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder the page names by a property of its own is answered apart from the files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder the world holds no file under is left out of that answer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides whether a page may be acted on.",
    },
  ],
} as const satisfies Module
