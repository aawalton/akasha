import type { SelectProperty } from "@akasha/pages-system/select-property"

export const anchorTier = {
  id: "01a0685e-ef8a-7c8d-8b8c-de6047bf0040",
  pageTypeSlug: "select-property",
  slug: "anchor-tier",
  propertySlug: "tier",
  definition: "how close an anchor pins the moment it dates",
  values: ["exact-date", "sub-day", "day-offset", "coarse-offset", "season-festival", "unanchored"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A tier is how close the wording pins the moment rather than how sure the wording is.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor pinning nothing is unanchored rather than absent.",
    },
  ],
} as const satisfies SelectProperty

export type AnchorTier = (typeof anchorTier.values)[number]
