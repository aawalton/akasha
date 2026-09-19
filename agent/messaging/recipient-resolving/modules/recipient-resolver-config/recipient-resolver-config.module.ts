import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverConfig = {
  id: "01a0657d-a75e-7000-8cb9-c08b467911d7",
  type: "page-type/module",
  slug: "recipient-resolver-config",
  definition: "the tick interval and revive timeout read out of the environment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting the environment states as no positive finite number is the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seconds the environment states are held as milliseconds.",
    },
  ],
} as const satisfies Module
