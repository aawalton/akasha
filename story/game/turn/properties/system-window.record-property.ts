import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const systemWindow = {
  id: "01a0c680-3679-76c4-9c9a-ac85779d4f39",
  type: "page-type/record-property",
  slug: "system-window",
  propertySlug: "windows",
  definition: "what the system itself said in a turn, beside the prose that turn made",
  properties: [
    { pageProperty: "text-property/window-kind", required: true, many: false },
    { pageProperty: "text-property/listed-name", required: false, many: false },
    { pageProperty: "text-property/listed-rung", required: false, many: false },
    { pageProperty: "number-property/entity-level", required: false, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window names one thing and says one line about it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No window carries the prose the turn said around it.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
