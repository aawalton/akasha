import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchPostcardsFromFarAway = {
  id: "01a0b9ee-fc19-71be-8b6d-5738fe2a2323",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-postcards-from-far-away",
  ownLength: 0.8021333333333334,
  ownProgress: 0.8021333333333334,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Postcards from Far Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "postcardsfromfaraway|4gzpq5DPGxSnKTe4SA8HAU|48128",
  song: "song/coldplay-postcards-from-far-away",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 2,
      externalId: "3KdUdP8JusiGrwcxu8pZre",
      externalLink: "https://open.spotify.com/track/3KdUdP8JusiGrwcxu8pZre",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 2,
      externalId: "4sbbpL1WwwGRr6xWk2y0Hk",
      externalLink: "https://open.spotify.com/track/4sbbpL1WwwGRr6xWk2y0Hk",
    },
  ],
} as const satisfies Track
