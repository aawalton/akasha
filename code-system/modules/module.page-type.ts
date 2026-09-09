import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Code } from "./properties/code.file-property.ts"
import type { ModuleTypes } from "./properties/module-types.file-property.ts"
import type { Test } from "./properties/test.file-property.ts"
import type { TestFixtures } from "./properties/test-fixtures.file-property.ts"

export type Module = Domain & {
  code: Code
  types?: ModuleTypes
  test?: Test
  testFixtures?: TestFixtures
}

export const module = {
  id: "01a04a20-6e04-7b99-81a0-0efe0ad0a02a",
  pageTypeSlug: "page-type",
  slug: "module",
  definition: "code reached by importing it",
  pluralSlug: "modules",
  partSlugs: [
    "file-property/code",
    "file-property/module-types",
    "file-property/test",
    "file-property/test-fixtures",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "file-property/code", required: true, many: false },
    { pagePropertySlug: "file-property/module-types", required: false, many: false },
    { pagePropertySlug: "file-property/test", required: false, many: false },
    { pagePropertySlug: "file-property/test-fixtures", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module's code is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A module page states its code's purpose.",
    },
    {
      invariantKind: "departure",
      statement: "The code states how.",
    },
    {
      invariantKind: "departure",
      statement: "A module's declarations are a page property of their own beside its code.",
    },
    {
      invariantKind: "departure",
      statement: "A module's test is a page property of its own beside its code.",
    },
    {
      invariantKind: "departure",
      statement: "A module's test fixtures are a page property of their own beside its test.",
    },
  ],
} as const satisfies PageType
