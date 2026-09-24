import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHypnotisedHypnotised = {
  id: "01a0b9ee-f35f-7b57-a5a7-e8466978297c",
  type: "page-type/track",
  slug: "coldplay-hypnotised-hypnotised",
  ownLength: 5.919533333333334,
  ownProgress: 5.919533333333334,
  partOfCollections: ["release/coldplay-hypnotised"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hypnotised",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "hypnotised|4gzpq5DPGxSnKTe4SA8HAU|355172",
  song: "song/coldplay-hypnotised",
  carriedBy: [
    {
      release: "release/coldplay-hypnotised",
      discNumber: 1,
      position: 1,
      externalId: "5LXj9Ch3O9ATm1NoHT8GXn",
      externalLink: "https://open.spotify.com/track/5LXj9Ch3O9ATm1NoHT8GXn",
    },
  ],
} as const satisfies Track
