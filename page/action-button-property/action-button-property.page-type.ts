import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const actionButtonProperty = {
  id: "01a0a038-58f8-77ef-9a9c-55d8f5e3d9ad",
  type: "page-type",
  slug: "action-button-property",
  definition: "a page property drawn as a button running a verb over the page",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value of such a property is the button rather than anything the page holds.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
