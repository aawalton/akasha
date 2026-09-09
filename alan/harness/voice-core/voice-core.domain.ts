import type { Domain } from "../../../domains/domain.page-type.ts"

export const voiceCore = {
  id: "01a05b55-e06e-741c-b7db-8e5f91fea0b7",
  pageTypeSlug: "domain",
  slug: "voice-core",
  definition: "how written text is cut into what a voice can speak, and when each sentence is said",
  parts: ["module/speech", "module/mark-schema", "module/estimate-marks", "module/infer-endpoint"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here reaches a voice.",
    },
    {
      invariantKind: "departure",
      statement: "The same cut serves the browser and the phone alike.",
    },
  ],
} as const satisfies Domain
