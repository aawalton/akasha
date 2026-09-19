import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const anchorTier = {
  id: "01a0685e-ef8a-7c8d-8b8c-de6047bf0040",
  type: "page-type/select-property",
  slug: "anchor-tier",
  propertySlug: "tier",
  definition: "how close an anchor pins the moment it dates",
  values: ["exact-date", "sub-day", "day-offset", "coarse-offset", "season-festival", "unanchored"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tier is how close the wording pins the moment rather than how sure the wording is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor pinning nothing is unanchored rather than absent.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
