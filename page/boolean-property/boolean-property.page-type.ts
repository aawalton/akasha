import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const booleanProperty = {
  id: "01a04dff-9d7d-7fd5-9836-5f16e5cc63d0",
  type: "page-type/page-type",
  slug: "boolean-property",
  definition: "a page property holding true or false",
  icon: "square-check",
  extends: ["page-type/page-property"],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
