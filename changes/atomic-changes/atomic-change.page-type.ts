import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageType } from "../../pages/types/page-type.page-type.ts"

export type AtomicChange = Module

export const atomicChange = {
  id: "01a072c8-f35d-7ffc-afc3-75b72460b059",
  pageTypeSlug: "page-type",
  slug: "atomic-change",
  definition: "a change to one thing that leaves the tree whole wherever that thing reaches",
  pluralSlug: "atomic-changes",
  partSlugs: [
    "atomic-change/rename-export",
    "atomic-change/rename-key",
    "atomic-change/rename-local-variable",
  ],
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change to two things is two atomic changes.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change lands every file the thing reaches, or none of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "An atomic change asks the index what a thing reaches rather than walking the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change refuses or leaves the tree whole.",
    },
  ],
} as const satisfies PageType
