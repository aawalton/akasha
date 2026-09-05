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
    "atomic-change/rename-property-signature",
    "atomic-change/rename-local-variable",
    "atomic-change/rename-path",
    "atomic-change/rename-slug",
  ],
  extendsSlug: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change to two things is two atomic changes.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change runs no atomic change.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change lands every file the thing reaches, or none of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "An atomic change asks the index for the files a thing reaches rather than walking the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer refuses the change rather than narrowing its reach.",
    },
    {
      invariantKind: "departure",
      statement: "An atomic change refuses or leaves the tree whole.",
    },
  ],
} as const satisfies PageType
