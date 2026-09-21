import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mediaToken = {
  id: "01a05c27-31ee-78e6-8559-1de73e833862",
  type: "page-type/module",
  slug: "media-token",
  definition: "an expiring HMAC token over a page, medium and variant, minted and checked",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A media token is signed with a key of its own rather than with a site's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site with no key hands out no token and admits none.",
    },
  ],
} as const satisfies Module
