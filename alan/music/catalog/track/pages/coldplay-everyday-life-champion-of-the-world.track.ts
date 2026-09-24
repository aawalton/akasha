import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeChampionOfTheWorld = {
  id: "01a0b9ee-d102-7a1d-a8a3-c646c25873c8",
  type: "page-type/track",
  slug: "coldplay-everyday-life-champion-of-the-world",
  ownLength: 4.292433333333333,
  ownProgress: 4.292433333333333,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Champion Of The World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "championoftheworld|4gzpq5DPGxSnKTe4SA8HAU|257546",
  song: "song/coldplay-champion-of-the-world",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 7,
      externalId: "6mf7BNgXs8JipPr2QILnyN",
      externalLink: "https://open.spotify.com/track/6mf7BNgXs8JipPr2QILnyN",
    },
  ],
} as const satisfies Track
