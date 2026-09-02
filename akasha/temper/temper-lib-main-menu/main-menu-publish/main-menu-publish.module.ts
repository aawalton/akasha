import type { Module } from "@akasha/code-system/module"

export const mainMenuPublish = {
  id: "01a0605b-c804-7741-baf4-fd76e49cbba7",
  pageTypeSlug: "module",
  slug: "main-menu-publish",
  definition: "the library object handed to the game under one global name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A second copy of the library loading later leaves the first copy in place.",
    },
    {
      invariantKind: "departure",
      statement: "A console client is handed nothing.",
    },
  ],
} as const satisfies Module
