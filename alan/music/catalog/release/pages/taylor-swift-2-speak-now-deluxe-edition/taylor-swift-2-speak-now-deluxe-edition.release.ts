import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEdition = {
  id: "01a0676a-d729-7074-883d-cb06193024b5",
  type: "page-type/release",
  slug: "taylor-swift-2-speak-now-deluxe-edition",
  title: "Speak Now (Deluxe Edition)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 91.840117,
  ownProgress: 91.840117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-10-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5EpMjweRD573ASl7uNiHym",
      externalLink: "https://open.spotify.com/album/5EpMjweRD573ASl7uNiHym",
    },
  ],
} as const satisfies Release
