import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const component = {
  id: "01a071cb-913c-7e3f-9698-f5f4a5019a9c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "component",
  definition: "code drawing something for a browser",
  pluralSlug: "components",
  parts: [
    "code-file-property/component-code",
    "code-file-property/component-test",
    "code-file-property/component-test-fixtures",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/component-code", required: true, many: false },
    { pageProperty: "code-file-property/component-test", required: false, many: false },
    {
      pageProperty: "code-file-property/component-test-fixtures",
      required: false,
      many: false,
    },
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
      statement: "A component's test and the fixtures setting that test up sit beside that code.",
    },
    {
      invariantKind: "departure",
      statement: "A component is reached by importing that component.",
    },
  ],
  types: "ts",
} as const satisfies PageType
