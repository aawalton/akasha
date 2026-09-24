import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchNowMyFeetWontTouchTheGround = {
  id: "01a0b9ee-fcfe-79a6-a5f2-a93391a8b56d",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-now-my-feet-wont-touch-the-ground",
  ownLength: 2.4586833333333336,
  ownProgress: 2.4586833333333336,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Now My Feet Won't Touch the Ground",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "nowmyfeetwonttouchtheground|4gzpq5DPGxSnKTe4SA8HAU|147521",
  song: "song/coldplay-now-my-feet-wont-touch-the-ground",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 8,
      externalId: "0nSfoEVGexB65mxj8aRDYK",
      externalLink: "https://open.spotify.com/track/0nSfoEVGexB65mxj8aRDYK",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 8,
      externalId: "4PA4J8GvCN8RuE39wJ1QT1",
      externalLink: "https://open.spotify.com/track/4PA4J8GvCN8RuE39wJ1QT1",
    },
  ],
} as const satisfies Track
