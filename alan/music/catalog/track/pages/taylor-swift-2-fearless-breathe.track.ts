import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessBreathe = {
  id: "01a0ce86-9000-7228-9761-72053395bf90",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-breathe",
  ownLength: 4.39955,
  ownProgress: 4.39955,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Breathe",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "6aZyMrc4doVtZyKNilOmwu", artistName: "Colbie Caillat" },
  ],
  trackKey: "breathe|06HL4z0CvFAxyc27GXpf02,6aZyMrc4doVtZyKNilOmwu|263973",
  song: "song/taylor-swift-breathe",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 7,
      externalId: "49mWEy5MgtNujgT7xU3emT",
      externalLink: "https://open.spotify.com/track/49mWEy5MgtNujgT7xU3emT",
    },
  ],
} as const satisfies Track
