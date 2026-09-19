import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAdventureOfALifetime = {
  id: "01a0b9ee-d59b-7e84-9f41-d7caffaeb7b6",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-adventure-of-a-lifetime",
  ownLength: 4.396433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69uxyAqqPIsUyTO8txoP2M",
      externalLink: "https://open.spotify.com/track/69uxyAqqPIsUyTO8txoP2M",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Adventure of a Lifetime",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "adventureofalifetime|4gzpq5DPGxSnKTe4SA8HAU|263786",
  song: "song/coldplay-adventure-of-a-lifetime",
} as const satisfies Track
