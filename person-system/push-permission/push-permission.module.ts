import type { Module } from "@akasha/code-system/module"

export const pushPermission = {
  id: "01a05b54-a909-7753-8cc3-52b02c145266",
  pageTypeSlug: "module",
  slug: "push-permission",
  definition: "what the app does about the push permission a device stands at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device that granted the permission registers.",
    },
    {
      invariantKind: "departure",
      statement: "A device that has not been asked is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A device that refused is left without push.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the device.",
    },
  ],
} as const satisfies Module
