import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionStrawberrySwing = {
  id: "01a0b9ee-e0df-7c37-b7bd-58b8911b33d9",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-strawberry-swing",
  ownLength: 4.1611,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4DLHhwZCJptTUCQPk6IAq8",
      externalLink: "https://open.spotify.com/track/4DLHhwZCJptTUCQPk6IAq8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strawberry Swing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "strawberryswing|4gzpq5DPGxSnKTe4SA8HAU|249666",
  song: "song/coldplay-strawberry-swing",
} as const satisfies Track
