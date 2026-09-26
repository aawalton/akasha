import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const image = {
  id: "01a0de63-929b-7b94-b961-15bde54b3c2e",
  type: "page-type/domain",
  slug: "image",
  definition: "how a service is used to make a picture",
  parts: [
    "domain/image-edit",
    "domain/image-upscale",
    "domain/image-generation",
    "domain/image-intelligence",
  ],
} as const satisfies Domain
