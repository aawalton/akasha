import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const dockerfile = {
  id: "01a06865-abff-7000-a441-7a4caa49c9d9",
  type: "page-type/domain",
  slug: "dockerfile",
  definition: "the Dockerfile each service is built from, written from what the service imports",
  parts: [
    "module/dockerfile-builder",
    "module/dockerfile-bun-service",

    "module/dockerfile-extensions",
    "module/dockerfile-imports",
    "module/dockerfile-nextjs",
    "module/dockerfile-services",
    "module/dockerfile-tool-image",
    "change-generator/dockerfile-writing",
    "page-type/built-image",
  ],
} as const satisfies Domain
