import type { FileProperty } from "@akasha/pages-system/file-property"

export type GenerationAudios = "jsonl"

export const generationAudios = {
  id: "01a0685d-b81f-7b18-83d0-35da71ba6877",
  pageTypeSlug: "file-property",
  slug: "generation-audios",
  propertySlug: "audios",
  definition: "every sound the runs in this log have made",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One row is one json object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "An audio row records where its bytes stand, never the bytes.",
    },
  ],
} as const satisfies FileProperty
