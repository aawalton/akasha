import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const setVeteranEquipTypes = {
  id: "01a0d8e1-0ec1-7187-bb77-3c0cf67b3647",
  type: "page-type/text-property",
  slug: "set-veteran-equip-types",
  propertySlug: "set-veteran-equip-types",
  definition: "the constants naming the slots where a set's piece drops only on veteran difficulty",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set veteran in every slot states that on its own rather than here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-25T14:03:43.169Z",
  updatedAt: "2026-09-25T14:03:50.000Z",
} as const satisfies TextProperty
