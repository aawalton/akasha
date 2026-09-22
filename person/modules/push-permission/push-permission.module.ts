import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushPermission = {
  id: "01a05b54-a909-7753-8cc3-52b02c145266",
  type: "page-type/module",
  slug: "push-permission",
  definition: "what the app does about a device's push permission",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A device that granted the permission registers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device that has not been asked is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device that refused is left without push.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the device.",
    },
  ],
} as const satisfies Module
