import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const sourceVersion = {
  id: "01a08234-f12b-7ac2-bfbb-0dd5515b7b36",
  type: "page-type/number-property",
  slug: "source-version",
  propertySlug: "source-version",
  definition: "the version the source was at when a generated declaration was written",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The version is read from the source rather than chosen by the person running the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two generated declarations stating different versions are a partial run.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T18:08:22.827Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
