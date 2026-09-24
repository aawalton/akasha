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
    {
      statement:
        "Every visitor is pushed each change to a value that visitor can see, signed in or not.",
    },
    { statement: "Every piece of data a web app shows is a page or a page's property." },
    {
      statement:
        "A change to a page's file property or computed property is pushed as a change to that page.",
    },
    {
      statement: "A computed property keeps, uncommitted, the pages, files and folders it reads.",
    },
    {
      statement: "A computed property reading many files in one folder keeps that folder instead.",
    },
    { statement: "A calculation reads a folder through its reach as it reads a file." },
    { statement: "A browser is pushed each change to a page or list it shows, and to no other." },
    {
      statement:
        "A reader holding a page type's shape drops it when a change to that page type is pushed.",
    },
    {
      statement:
        "A seat's page shows each new message and change of working color live, with no refresh.",
    },
  ],
} as const satisfies Initiative
