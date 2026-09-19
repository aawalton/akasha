import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchPostcardsFromFarAway = {
  id: "01a0b9ee-fc19-71be-8b6d-5738fe2a2323",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-postcards-from-far-away",
  ownLength: 0.8021333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-prospekt-s-march"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KdUdP8JusiGrwcxu8pZre",
      externalLink: "https://open.spotify.com/track/3KdUdP8JusiGrwcxu8pZre",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Postcards from Far Away",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "postcardsfromfaraway|4gzpq5DPGxSnKTe4SA8HAU|48128",
  song: "song/coldplay-postcards-from-far-away",
} as const satisfies Track
