import type { FileProperty } from "@akasha/pages/file-property"

export type GenerationAudios = "jsonl"

export const generationAudios = {
  id: "01a0685d-b81f-7b18-83d0-35da71ba6877",
  pageTypeSlug: "file-property",
  type: "file-property",
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
      statement: "An audio row records where its bytes are rather than the bytes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Rows past the most bytes one file may have roll into a numbered part beside that file.",
    },
    {
      invariantKind: "departure",
      statement: "The first part beside a page is part2.",
    },
    {
      invariantKind: "departure",
      statement: "Each further part takes the next number up.",
    },
  ],
} as const satisfies FileProperty
