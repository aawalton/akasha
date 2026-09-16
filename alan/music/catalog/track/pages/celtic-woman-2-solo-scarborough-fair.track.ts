import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloScarboroughFair = {
  id: "01a0abea-6b10-7c33-85bd-31dcd0496770",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-scarborough-fair",
  ownLength: 3.2169166666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-solo"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7g6sxwha7UIE9jLrUYXcYT",
      externalLink: "https://open.spotify.com/track/7g6sxwha7UIE9jLrUYXcYT",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Scarborough Fair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7Jotu5LupekFt00kZZZ7C6", artistName: "Hayley Westenra" }],
  trackKey: "scarboroughfair|7Jotu5LupekFt00kZZZ7C6|193015",
} as const satisfies Track
