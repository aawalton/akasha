import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const carYearSlug = {
  id: "01a0c543-8c25-7484-9da3-144fd1373381",
  type: "page-type/text-property",
  slug: "car-year-slug",
  propertySlug: "car-year-slug",
  definition: "a trim's model year",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A row names its year by a bare slug rather than by a qualified name.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is `relation-property/car-year`.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No change renames a field of an entry.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A passage a file holds twice is refused, so a row's field is not rewritten by hand either.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
