import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const audioBytes = {
  id: "01a0c640-7821-7910-a08b-12ee014d0db7",
  type: "page-type/file-property",
  slug: "audio-bytes",
  propertySlug: "bytes",
  definition: "the sound itself",
  extensions: ["wav"],
  runsFileLength: false,
  holdsBytes: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sound's bytes are a file beside that sound's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every sound the system holds is a wav.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are held out of the commit, and the page beside them is committed.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
