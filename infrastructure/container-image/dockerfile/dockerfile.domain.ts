import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const dockerfile = {
  id: "01a06865-abff-7000-a441-7a4caa49c9d9",
  type: "page-type/domain",
  slug: "dockerfile",
  definition: "how code writes a Dockerfile from what a service imports",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Dockerfile" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Dockerfiles" },
  ],
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
