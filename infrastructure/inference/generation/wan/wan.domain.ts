import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const wan = {
  id: "01a06815-9efd-7028-bfc6-b3c3933ac08c",
  type: "page-type/domain",
  slug: "wan",
  definition: "how code makes a video from an image",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "wan" }],
  parts: [
    "container-recipe/wan-image",
    "module/wan-backbone",
    "module/wan-extend-graph",
    "module/wan-i2v-graph",
    "module/wan-size",
    "python-module/wan-frame-scoring",
    "shell-script/wan-down",
    "shell-script/wan-provision",
    "shell-script/wan-smoke",
    "shell-script/wan-up",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A graph is built here and run by the holder of the daemon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two experts split one sampling run at the step halfway through.",
    },
  ],
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-25T16:44:32.000Z",
} as const satisfies Domain
