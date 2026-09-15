import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsDeireadhAnTuath = {
  id: "01a0a5b0-1784-776a-99db-0947f4c94f27",
  type: "track",
  slug: "enya-stars-deireadh-an-tuath",
  ownLength: 1.7273333333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "252BzB1qTf2114W3R97qID",
      externalLink: "https://open.spotify.com/track/252BzB1qTf2114W3R97qID",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Deireadh an Tuath",
} as const satisfies Track
