import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const keyBindings = {
  id: "01a18478-1f8a-7a17-be9a-fca30c1e7d13",
  type: "page-type/record-property",
  slug: "key-bindings",
  propertySlug: "bindings",
  definition: "the keys an action is bound to, one key and its modifiers to an entry",
  properties: [
    { pageProperty: "number-property/binding-slot", required: true, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    {
      pageProperty: "select-property/binding-modifiers",
      required: false,
      many: true,
      maxCount: 4,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is named by the constant the game gives that key, such as `KEY_HOME`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot holding no key has no entry.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T21:43:47.335Z",
  updatedAt: "2026-10-28T21:43:47.335Z",
} as const satisfies RecordProperty
