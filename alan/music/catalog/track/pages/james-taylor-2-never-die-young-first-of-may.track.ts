import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungFirstOfMay = {
  id: "01a0abeb-41a6-7d07-9126-939925d0d460",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-first-of-may",
  ownLength: 4.02,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08lmf4weog2lDvgOfPMuEu",
      externalLink: "https://open.spotify.com/track/08lmf4weog2lDvgOfPMuEu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "First of May",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "firstofmay|0vn7UBvSQECKJm2817Yf1P|241200",
} as const satisfies Track
