import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsEntry = {
  id: "01a0605a-051c-7251-adf5-3039dae90ad3",
  type: "page-type/module",
  slug: "addon-keybinds-entry",
  definition: "the call patching the keybindings menu once the bundle loads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle entry imports this module for the patch alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing waits on the caller to ask for the split.",
    },
  ],
  createdAt: "2026-09-02T04:21:47.420Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
