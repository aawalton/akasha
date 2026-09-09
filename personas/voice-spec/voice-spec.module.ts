import type { Module } from "../../code-system/modules/module.page-type.ts"

export const voiceSpec = {
  id: "01a05b70-a58d-78db-84fb-024bfd2939aa",
  pageTypeSlug: "module",
  type: "module",
  slug: "voice-spec",
  definition: "the shape a persona's cloned voice is described by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A voice cloned from a real speaker runs in lane R and no other lane.",
    },
    {
      invariantKind: "departure",
      statement: "A designed voice has the instruction the designed voice was designed by.",
    },
    {
      invariantKind: "constraint",
      statement: "Every path a spec names is relative to the repo.",
    },
  ],
} as const satisfies Module
