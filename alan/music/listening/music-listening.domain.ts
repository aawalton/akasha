import type { Domain } from "../../../domains/domain.page-type.ts"

export const musicListening = {
  id: "01a06238-8d2d-7235-bf50-19c7fc57723c",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "music-listening",
  definition: "what has been listened to",
  parts: ["page-type/heard-music"],
} as const satisfies Domain
