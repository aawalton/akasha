import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverConfig = {
  id: "01a0657d-a75e-7000-8cb9-c08b467911d7",
  type: "module",
  slug: "recipient-resolver-config",
  definition: "the tick interval, revive timeout and dry-run setting read out of the environment",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A setting the environment states as no positive finite number is the default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seconds the environment states are held as milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Dry run is on where the environment says `1` or `true` or `yes` or `on`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The value the environment states is read without regard to case or surrounding spaces.",
    },
  ],
} as const satisfies Module
