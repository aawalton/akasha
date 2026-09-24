import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsArmyOfOne = {
  id: "01a0b9ee-d60d-78da-94b3-c4eb86bfb47c",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-army-of-one",
  ownLength: 6.280433333333334,
  ownProgress: 6.280433333333334,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Army of One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "armyofone|4gzpq5DPGxSnKTe4SA8HAU|376826",
  song: "song/coldplay-army-of-one",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 8,
      externalId: "4giCxIFPZNQIP4bIZM4sqH",
      externalLink: "https://open.spotify.com/track/4giCxIFPZNQIP4bIZM4sqH",
    },
  ],
} as const satisfies Track
