import type { Module } from "@akasha/code-system/module"

export const capacitorBridge = {
  id: "01a063c9-03ff-7eb7-8909-d39430301bb3",
  pageTypeSlug: "module",
  slug: "capacitor-bridge",
  definition: "the plugins the native shell puts on the window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plugin is read back only where the shell holds every call this page states.",
    },
    {
      invariantKind: "departure",
      statement: "A plugin the shell does not hold is read back as null rather than thrown over.",
    },
    {
      invariantKind: "departure",
      statement: "The device secret is presented by the native layer and answered with a status.",
    },
    {
      invariantKind: "absence",
      statement: "The device secret is never read back into JavaScript.",
    },
    {
      invariantKind: "departure",
      statement:
        "The response minting a device secret is the one place JavaScript sees the plaintext.",
    },
    {
      invariantKind: "departure",
      statement: "A presentation held false means the keychain answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shell holding no presentation never decides the held secret is bad.",
    },
  ],
} as const satisfies Module
