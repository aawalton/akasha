import type { Module } from "@akasha/code/module"

export const mediaPage = {
  id: "01a0655d-daa7-77e5-94c7-6372a1f52830",
  pageTypeSlug: "module",
  type: "module",
  slug: "media-page",
  definition: "a page with media, resolved from what a media address names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A media address whose page id is no uuid is refused ahead of any page read.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is cheap rather than the check on who may reach the media.",
    },
    {
      invariantKind: "departure",
      statement: "A media address carries a page id and no page type.",
    },
    {
      invariantKind: "departure",
      statement: "The id is looked for under the page types whose media config serves media.",
    },
  ],
} as const satisfies Module
