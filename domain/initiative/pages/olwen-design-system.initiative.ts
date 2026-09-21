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
        "Every property badge reads as the value's own name rather than as the text akasha files it under.",
    },
  ],
} as const satisfies Initiative
