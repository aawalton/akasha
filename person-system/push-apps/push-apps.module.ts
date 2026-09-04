import type { Module } from "@akasha/code-system/module"

export const pushApps = {
  id: "01a05c96-89f6-764e-b32f-d57a6a43bb6b",
  pageTypeSlug: "module",
  slug: "push-apps",
  definition: "the bundle and the owner each app registering for push stands under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every app that may register for push is named here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here registers anything.",
    },
  ],
} as const satisfies Module
