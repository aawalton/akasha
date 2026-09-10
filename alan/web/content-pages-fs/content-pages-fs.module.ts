import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const contentPagesFs = {
  id: "01a0655d-daa6-7fba-9667-d8a69380ce58",
  pageTypeSlug: "module",
  type: "module",
  slug: "content-pages-fs",
  definition: "content pages held in the device's own file system",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which ids are held is answered from the index rather than from the body files.",
    },
    {
      invariantKind: "constraint",
      statement: "Reading every body to answer that would read the whole held library each time.",
    },
    {
      invariantKind: "gap",
      statement: "An id the index names has a body that reads back.",
    },
    {
      invariantKind: "gap",
      statement: "A body that does not read back is fetched again rather than reported as held.",
    },
  ],
} as const satisfies Module
