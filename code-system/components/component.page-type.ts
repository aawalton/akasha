import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ComponentCode } from "./properties/component-code.file-property.ts"
import type { ComponentTest } from "./properties/component-test.file-property.ts"
import type { ComponentTestFixtures } from "./properties/component-test-fixtures.file-property.ts"

export type Component = Domain & {
  code: ComponentCode
  test?: ComponentTest
  testFixtures?: ComponentTestFixtures
}

export const component = {
  id: "01a071cb-913c-7e3f-9698-f5f4a5019a9c",
  pageTypeSlug: "page-type",
  slug: "component",
  definition: "code drawing something for a browser",
  pluralSlug: "components",
  partSlugs: [
    "file-property/component-code",
    "file-property/component-test",
    "file-property/component-test-fixtures",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "component-code", required: true, many: false },
    { pagePropertySlug: "component-test", required: false, many: false },
    { pagePropertySlug: "component-test-fixtures", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A component draws something for a browser.",
    },
    {
      invariantKind: "departure",
      statement: "A component's code is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A component's test and the fixtures setting it up sit beside that code.",
    },
    {
      invariantKind: "departure",
      statement: "A component is reached by importing it.",
    },
  ],
} as const satisfies PageType
