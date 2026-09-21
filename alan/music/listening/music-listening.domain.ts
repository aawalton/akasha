import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicListening = {
  id: "01a06238-8d2d-7235-bf50-19c7fc57723c",
  type: "page-type/domain",
  slug: "music-listening",
  definition: "what has been listened to",
  parts: ["page-type/heard-music", "service-workstation/music-capture"],
} as const satisfies Domain
