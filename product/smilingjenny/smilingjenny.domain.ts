import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const smilingjenny = {
  id: "01a06558-c2cc-7001-8227-51c0ccc9cee7",
  type: "page-type/domain",
  slug: "smilingjenny",
  definition: "what Jenny is shown and asked of her own day",
  parts: ["router-app/smilingjenny-web"],
} as const satisfies Domain
