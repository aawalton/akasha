import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionBreathe = {
  id: "01a0ce86-92ff-738a-b7ab-a410d34347cc",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-breathe",
  ownLength: 4.399766666666666,
  ownProgress: 4.399766666666666,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Breathe",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "6aZyMrc4doVtZyKNilOmwu", artistName: "Colbie Caillat" },
  ],
  trackKey: "breathe|06HL4z0CvFAxyc27GXpf02,6aZyMrc4doVtZyKNilOmwu|263986",
  song: "song/taylor-swift-breathe",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 13,
      externalId: "6S9G7J3EB1ZY0rrZPwsBg5",
      externalLink: "https://open.spotify.com/track/6S9G7J3EB1ZY0rrZPwsBg5",
    },
  ],
} as const satisfies Track
