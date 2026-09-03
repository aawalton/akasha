import type { SelectProperty } from "@akasha/pages-system/select-property"

export const linkPlatform = {
  id: "01a06823-89b2-700c-876a-8f2a761dc8e5",
  pageTypeSlug: "select-property",
  slug: "link-platform",
  propertySlug: "platform",
  definition: "where a link is followed from",
  values: ["web", "native"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A native link is followed inside the app and nowhere else.",
    },
  ],
} as const satisfies SelectProperty

export type LinkPlatform = (typeof linkPlatform.values)[number]
