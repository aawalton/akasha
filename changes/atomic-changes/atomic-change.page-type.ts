import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type AtomicChange = Module

export const atomicChange = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "atomic-change",
  definition: "a change that leaves the tree whole and splits into none that do",
  pluralSlug: "atomic-changes",
  partSlugs: ["atomic-change/rename-local-variable"],
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A change that splits across files into two that each leave the tree whole is two atomic changes.",
    },
    {
      invariantKind: "departure",
      statement: "A change that leaves the tree whole within one file is one atomic change.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change refuses or leaves the tree whole.",
    },
  ],
} as const satisfies PageType
