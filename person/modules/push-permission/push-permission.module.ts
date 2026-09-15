import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushPermission = {
  id: "01a05b54-a909-7753-8cc3-52b02c145266",
  type: "module",
  slug: "push-permission",
  definition: "what the app does about the push permission a device is at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device that granted the permission registers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device that has not been asked is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device that refused is left without push.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks the device.",
    },
  ],
} as const satisfies Module
