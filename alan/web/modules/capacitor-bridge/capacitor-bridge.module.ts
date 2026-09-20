import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const capacitorBridge = {
  id: "01a063c9-03ff-7eb7-8909-d39430301bb3",
  type: "page-type/module",
  slug: "capacitor-bridge",
  definition: "the plugins the native shell puts on the window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plugin is read back only where the shell has every call this page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plugin the shell does not have is read back as null rather than thrown over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The device secret is presented by the native layer and answered with a status.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The device secret is never read back into JavaScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The response minting a device secret is the one place JavaScript sees the plaintext.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A presentation held false means the keychain answered with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell with no presentation never decides the held secret is bad.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handover answers with a code and the verifier that code is bound to.",
    },
  ],
} as const satisfies Module
