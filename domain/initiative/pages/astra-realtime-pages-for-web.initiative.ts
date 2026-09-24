import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraRealtimePagesForWeb = {
  id: "01a0d4c4-1471-78d7-8198-0a23f1adbb7f",
  type: "page-type/initiative",
  slug: "astra-realtime-pages-for-web",
  domain: "page-type/page",
  persona: "persona/astra",
  intentStack: [
    {
      statement:
        "Every piece of data a web app shows is updated as soon as it changes, with no refresh.",
    },
    { statement: "Every piece of data a web app shows is a page or a page's property." },
  ],
} as const satisfies Initiative
