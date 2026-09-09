import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperOrder = {
  id: "01a07868-3fef-7b0d-b721-c2f6bf21f5cf",
  pageTypeSlug: "module",
  type: "module",
  slug: "wallpaper-order",
  definition: "the order personas are tried in when a wallpaper is picked",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every caller picking a wallpaper orders the personas by this rule.",
    },
    {
      invariantKind: "departure",
      statement: "The route answering the phone lands on the persona the desktop service lands on.",
    },
    {
      invariantKind: "departure",
      statement: "The persona messaged most recently comes first.",
    },
    {
      invariantKind: "departure",
      statement: "A tie is settled by the page id.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with no wallpaper is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with no slug is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A stamp nothing can read sorts behind every stamp something can read.",
    },
  ],
} as const satisfies Module
