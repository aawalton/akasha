import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const imageAlbum = {
  id: "01a0e947-5ee0-74ef-a073-4f4cea830af5",
  type: "page-type/page-type",
  slug: "image-album",
  definition: "a named set of images seen together",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "album" },
    { partOfSpeech: "part-of-speech/noun", spelling: "albums" },
  ],
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An album's images are the images naming that album.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An album's page shows its images through the view an album embeds.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
