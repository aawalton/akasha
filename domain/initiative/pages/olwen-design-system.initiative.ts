import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const olwenDesignSystem = {
  id: "01a0c491-da86-751c-812c-611378a9eacb",
  type: "page-type/initiative",
  slug: "olwen-design-system",
  domain: "domain/design-interface-system",
  persona: "persona/olwen",
  intentStack: [
    {
      statement:
        "A wiki page lists its properties the way a Notion page does, each under its kind's icon.",
    },
  ],
} as const satisfies Initiative
