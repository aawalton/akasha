import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wallpaperOrder = {
  id: "01a07868-3fef-7b0d-b721-c2f6bf21f5cf",
  type: "module",
  slug: "wallpaper-order",
  definition: "the order personas are tried in when a wallpaper is picked",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every caller picking a wallpaper orders the personas by this rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The route answering the phone lands on the persona the desktop service lands on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona messaged most recently comes first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tie is settled by the page id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona with no wallpaper is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona with no slug is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stamp nothing can read sorts behind every stamp something can read.",
    },
  ],
} as const satisfies Module
