import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicListening = {
  id: "01a06238-8d2d-7235-bf50-19c7fc57723c",
  type: "page-type/domain",
  slug: "music-listening",
  definition: "the music Alan plays",
  parts: ["page-type/heard-music", "service-workstation/music-capture"],
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Listen history syncs every hour." },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every listen is tracked against a track rather than a release or a song.",
    },
  ],
} as const satisfies Domain
