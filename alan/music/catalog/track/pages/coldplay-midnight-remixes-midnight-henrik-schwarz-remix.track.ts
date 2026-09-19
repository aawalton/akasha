import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightHenrikSchwarzRemix = {
  id: "01a0b9ee-f728-7c0f-a765-3a45c3323f55",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-henrik-schwarz-remix",
  ownLength: 8.693783333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5r2MY01a6rIInRAqXYyh6y",
      externalLink: "https://open.spotify.com/track/5r2MY01a6rIInRAqXYyh6y",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Henrik Schwarz Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "1ooAqaFu4Ac3BO2HpL4V2R", artistName: "Henrik Schwarz" },
  ],
  trackKey: "midnighthenrikschwarzremix|1ooAqaFu4Ac3BO2HpL4V2R,4gzpq5DPGxSnKTe4SA8HAU|521627",
  song: "song/coldplay-midnight",
} as const satisfies Track
