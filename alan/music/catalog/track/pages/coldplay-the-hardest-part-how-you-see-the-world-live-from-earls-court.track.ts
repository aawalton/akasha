import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheHardestPartHowYouSeeTheWorldLiveFromEarlsCourt = {
  id: "01a0b9ee-fd9f-71af-9123-fe2ad3c693f6",
  type: "page-type/track",
  slug: "coldplay-the-hardest-part-how-you-see-the-world-live-from-earls-court",
  ownLength: 4.2771,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-hardest-part"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0hCYORw7uzYRXdrZ88vN2t",
      externalLink: "https://open.spotify.com/track/0hCYORw7uzYRXdrZ88vN2t",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How You See the World - Live from Earls Court",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "howyouseetheworldlivefromearlscourt|4gzpq5DPGxSnKTe4SA8HAU|256626",
  song: "song/coldplay-how-you-see-the-world",
} as const satisfies Track
