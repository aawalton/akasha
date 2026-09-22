import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCover = {
  id: "01a0617e-0d2d-7009-84e0-cb261f506633",
  type: "page-type/module",
  slug: "page-cover",
  definition: "a page's cover image and the popover setting its url",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover nobody may change is the image alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No cover and no way to set one is nothing at all.",
    },
  ],
} as const satisfies Module
