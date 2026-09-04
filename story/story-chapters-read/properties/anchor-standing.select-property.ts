import type { SelectProperty } from "@akasha/pages-system/select-property"

export const anchorStanding = {
  id: "01a0685e-ef8a-7fef-b999-aae06d585ffb",
  pageTypeSlug: "select-property",
  slug: "anchor-standing",
  propertySlug: "standing",
  definition: "whether the story tells an anchor or a person in it says so",
  values: ["asserted", "claimed"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor the story tells is asserted and one a person in it says is claimed.",
    },
    {
      invariantKind: "departure",
      statement: "Only a claimed anchor names who claimed the anchor.",
    },
  ],
} as const satisfies SelectProperty

export type AnchorStanding = (typeof anchorStanding.values)[number]
