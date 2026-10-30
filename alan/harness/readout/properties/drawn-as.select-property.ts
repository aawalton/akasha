import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const drawnAs = {
  id: "01a063bd-a526-78b3-ad87-dc9525cc297e",
  type: "page-type/select-property",
  slug: "drawn-as",
  propertySlug: "drawn-as",
  definition: "whether a readout shows a stoplight or a number",
  values: ["stoplight", "number"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating nothing is drawn as a stoplight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout shown as a number is shown without a rung behind the figure.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:09:28.102Z",
  updatedAt: "2026-10-30T17:22:07.940Z",
} as const satisfies SelectProperty
