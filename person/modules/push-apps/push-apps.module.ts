import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushApps = {
  id: "01a05c96-89f6-764e-b32f-d57a6a43bb6b",
  type: "module",
  slug: "push-apps",
  definition: "the bundle and the owner each app registering for push sits under",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every app that may register for push is named here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here registers anything.",
    },
  ],
} as const satisfies Module
