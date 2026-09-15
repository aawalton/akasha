import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const anchorStanding = {
  id: "01a0685e-ef8a-7fef-b999-aae06d585ffb",
  type: "page-type/select-property",
  slug: "anchor-standing",
  propertySlug: "standing",
  definition: "whether the story tells an anchor or a person in it says so",
  values: ["asserted", "claimed"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An anchor the story tells is asserted and an anchor a person in that story says is claimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a claimed anchor names who claimed the anchor.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
