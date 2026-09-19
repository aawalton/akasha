import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalkTalkThinWhiteDukeMix = {
  id: "01a0b9ee-fe14-7077-bb64-5a5a654c77fe",
  type: "page-type/track",
  slug: "coldplay-talk-talk-thin-white-duke-mix",
  ownLength: 9.014433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6fMpfMEnQ9qjtPAZWEit5Q",
      externalLink: "https://open.spotify.com/track/6fMpfMEnQ9qjtPAZWEit5Q",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk - Thin White Duke Mix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talkthinwhitedukemix|4gzpq5DPGxSnKTe4SA8HAU|540866",
  song: "song/coldplay-talk",
} as const satisfies Track
