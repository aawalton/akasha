import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionWow = {
  id: "01a0aa7c-2dc3-7b99-a571-3ccdc922c251",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-wow",
  ownLength: 2.98485,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wKNWr3MsF3JonUxVab1Qz",
      externalLink: "https://open.spotify.com/track/4wKNWr3MsF3JonUxVab1Qz",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "WOW",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "wow|1Xylc3o4UrD53lo9CvFvVg|179091",
  song: "song/zara-larsson-wow",
} as const satisfies Track
