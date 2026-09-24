import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraRealtimePagesForWeb = {
  id: "01a0d4c4-1471-78d7-8198-0a23f1adbb7f",
  type: "page-type/initiative",
  slug: "astra-realtime-pages-for-web",
  domain: "page-type/page",
  persona: "persona/astra",
  intentStack: [
    { statement: "A browser is pushed each change to a page or list it shows, and to no other." },
    {
      statement:
        "A reader holding a page type's shape drops it when a change to that page type is pushed.",
    },
  ],
} as const satisfies Initiative
