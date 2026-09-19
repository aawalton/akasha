import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaParadiseTiestoRemix = {
  id: "01a0b9ee-f868-71a0-954e-3f06c4dc03cb",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-paradise-tiesto-remix",
  ownLength: 4.772433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-princess-of-china"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0pjMTISKHTJkogN1BPZxaC",
      externalLink: "https://open.spotify.com/track/0pjMTISKHTJkogN1BPZxaC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise - Tiësto Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "2o5jDhtHVPhrJdv3cEQ99Z", artistName: "Tiësto" },
  ],
  trackKey: "paradisetiestoremix|2o5jDhtHVPhrJdv3cEQ99Z,4gzpq5DPGxSnKTe4SA8HAU|286346",
  song: "song/coldplay-paradise",
} as const satisfies Track
