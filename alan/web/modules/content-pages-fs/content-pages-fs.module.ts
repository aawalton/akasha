import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contentPagesFs = {
  id: "01a0655d-daa6-7fba-9667-d8a69380ce58",
  type: "page-type/module",
  slug: "content-pages-fs",
  definition: "content pages held in the device's own file system",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which ids are held is answered from the index rather than from the body files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page opened while online is held here and read back when the fetch fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the pages opened most recently are held, and no page is held for good.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing fetches a page onto the device ahead of it being opened.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An id the index names has a body that reads back.",
    },
  ],
} as const satisfies Module
