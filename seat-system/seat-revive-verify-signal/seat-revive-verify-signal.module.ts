import type { Module } from "@akasha/code-system/module"

export const seatReviveVerifySignal = {
  id: "01a0686d-9d5e-700e-98bf-06b7ad829d40",
  pageTypeSlug: "module",
  slug: "seat-revive-verify-signal",
  definition: "what the exit code of a verifying resume says became of the seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A resume that exited cleanly revived its seat.",
    },
    {
      invariantKind: "departure",
      statement: "A resume that exited three could not verify its seat rather than failing.",
    },
    {
      invariantKind: "departure",
      statement: "Every other exit is a failure.",
    },
  ],
} as const satisfies Module
