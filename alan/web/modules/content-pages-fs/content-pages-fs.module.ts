import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contentPagesFs = {
  id: "01a0655d-daa6-7fba-9667-d8a69380ce58",
  type: "module",
  slug: "content-pages-fs",
  definition: "content pages held in the device's own file system",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which ids are held is answered from the index rather than from the body files.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Reading every body to answer that would read the whole held library each time.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An id the index names has a body that reads back.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A body that does not read back is fetched again rather than reported as held.",
    },
  ],
} as const satisfies Module
