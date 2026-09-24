import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheHardestPartTheHardestPart = {
  id: "01a0b9ee-fd79-79d7-b96b-ab8f8cd3204b",
  type: "page-type/track",
  slug: "coldplay-the-hardest-part-the-hardest-part",
  ownLength: 4.381333333333333,
  ownProgress: 4.381333333333333,
  partOfCollections: ["release/coldplay-the-hardest-part", "release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Hardest Part",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thehardestpart|4gzpq5DPGxSnKTe4SA8HAU|262880",
  song: "song/coldplay-the-hardest-part",
  carriedBy: [
    {
      release: "release/coldplay-the-hardest-part",
      discNumber: 1,
      position: 1,
      externalId: "6VfvwCxKaNnuVU4Mugu5k1",
      externalLink: "https://open.spotify.com/track/6VfvwCxKaNnuVU4Mugu5k1",
    },
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 10,
      externalId: "4Tw9JYF9HOuPRyccNWMgwf",
      externalLink: "https://open.spotify.com/track/4Tw9JYF9HOuPRyccNWMgwf",
    },
  ],
} as const satisfies Track
