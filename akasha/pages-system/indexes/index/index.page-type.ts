import type { Module } from "../../../code-system/module/module.page-type.ts"
import type { Test } from "../../../code-system/module/properties/test.file-property.ts"
import type { PageType } from "../../page-type/page-type.page-type.ts"
import type { IndexName } from "./properties/index-name.text-property.ts"

export type Index = Module & {
  test: Test
  indexName: IndexName
}

export const index = {
  id: "01a04ef3-160f-7849-949b-629de4915d07",
  pageTypeSlug: "page-type",
  slug: "index",
  definition: "one question the corpus can be asked, answered by reading one file",
  pluralSlug: "indexes",
  partSlugs: ["text-property/index-name"],
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "index-name", required: true, many: false },
    { pagePropertySlug: "test", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question reached by a different key is the same index.",
    },
    {
      invariantKind: "departure",
      statement: "Only a question no index answers is a new one.",
    },
    {
      invariantKind: "departure",
      statement: "An index is derived.",
    },
    {
      invariantKind: "departure",
      statement: "An index page says what is filed.",
    },
    {
      invariantKind: "departure",
      statement: "The code beside it files that and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An index states its test.",
    },
  ],
} as const satisfies PageType
