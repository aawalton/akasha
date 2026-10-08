import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const containerImage = {
  id: "01a0675b-16dc-759d-9b19-cf1118f36276",
  type: "page-type/domain",
  slug: "container-image",
  definition: "a program built with every file that program uses",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "container image" },
    { partOfSpeech: "part-of-speech/noun", spelling: "container images" },
  ],
  parts: [
    "domain/dockerfile",
    "manifest/buildkit",
    "manifest/buildkit-prune",
    "module/image-build",
    "module/image-inputs",
    "module/image-publishing",
    "module/image-ref",
    "module/recipe-page",
    "test-fixture/recipe-proving",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image is tagged with a hash of the image's build inputs rather than a name or version.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.012Z",
  updatedAt: "2026-09-25T17:07:13.000Z",
} as const satisfies Domain
