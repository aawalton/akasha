import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const widgetGallery = {
  id: "01a18d88-2d31-76a2-98f5-41a092fd47b9",
  type: "page-type/domain",
  slug: "widget-gallery",
  definition: "the screen a phone shows that offers readout widgets",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "widget gallery" },
    { partOfSpeech: "part-of-speech/noun", spelling: "widget galleries" },
  ],
  createdAt: "2026-10-30T15:57:54.351Z",
  updatedAt: "2026-10-30T15:57:54.351Z",
} as const satisfies Domain
