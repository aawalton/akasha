import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const module = {
  id: "01a04a20-6e04-7b99-81a0-0efe0ad0a02a",
  type: "page-type",
  slug: "module",
  definition: "code reached by importing it",
  pluralSlug: "modules",
  parts: [
    "code-file-property/code",
    "file-property/module-types",
    "code-file-property/test",
    "code-file-property/test-fixtures",
    "boolean-property/answers-a-checkout-root",
    "text-property/page-body-readers",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/code", required: true, many: false },
    { pageProperty: "file-property/module-types", required: false, many: false },
    { pageProperty: "code-file-property/test", required: false, many: false },
    { pageProperty: "code-file-property/test-fixtures", required: false, many: false },
    { pageProperty: "boolean-property/allows-tmp-paths", required: false, many: false },
    { pageProperty: "boolean-property/answers-a-checkout-root", required: false, many: false },
    {
      pageProperty: "text-property/page-body-readers",
      required: false,
      many: true,
      maxCount: null,
    },
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
    {
      invariantKind: "departure",
      statement:
        "A module composing the code a container runs says its paths are that container's.",
    },
  ],
  types: "ts",
} as const satisfies PageType
