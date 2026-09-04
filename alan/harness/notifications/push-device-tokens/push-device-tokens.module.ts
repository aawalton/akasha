import type { Module } from "@akasha/code-system/module"

export const pushDeviceTokens = {
  id: "01a069b6-bb6b-79f2-adbe-d2024ad66374",
  pageTypeSlug: "module",
  slug: "push-device-tokens",
  definition: "the devices one person is pushed at, read through this workstation's own service",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request goes to the loopback the pages service binds on this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "An origin named in the environment is used unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The loopback is reached only where the environment names no origin.",
    },
    {
      invariantKind: "constraint",
      statement: "The in-cluster service name resolves to nothing on this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "A token list that cannot be read is a throw rather than an empty answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a push.",
    },
  ],
} as const satisfies Module
