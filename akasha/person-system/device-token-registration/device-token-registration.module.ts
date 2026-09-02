import type { Module } from "@akasha/code-system/module"

export const deviceTokenRegistration = {
  id: "01a05c96-89f5-741d-a9a3-65ffde3552f4",
  pageTypeSlug: "module",
  slug: "device-token-registration",
  definition: "the push token a device is reached at, kept against whoever holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A registration raises rather than being written down.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the keys the `device-token` page type asks for.",
    },
    {
      invariantKind: "absence",
      statement: "No refusal carries the token a device presented.",
    },
    {
      invariantKind: "gap",
      statement: "The notifier reads its tokens from the markdown pages rather than from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "A token landed in akasha is read by nothing that sends.",
    },
    {
      invariantKind: "gap",
      statement: "A token landed in the markdown from the web pod dies at the next pod start.",
    },
  ],
} as const satisfies Module
