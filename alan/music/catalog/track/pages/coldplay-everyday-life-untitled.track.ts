import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeUntitled = {
  id: "01a0b9ee-d0d7-75d4-89e6-b3b24d882c8d",
  type: "page-type/track",
  slug: "coldplay-everyday-life-untitled",
  ownLength: 3.2444333333333333,
  ownProgress: 3.2444333333333333,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "بنی آدم",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|194666",
  song: "song/coldplay-untitled-5",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 6,
      externalId: "6DGzLNiawTtntC9NHzeMeY",
      externalLink: "https://open.spotify.com/track/6DGzLNiawTtntC9NHzeMeY",
    },
  ],
} as const satisfies Track
