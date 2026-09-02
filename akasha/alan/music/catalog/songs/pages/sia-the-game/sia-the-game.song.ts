import type { Song } from "../../song.page-type.ts"

export const siaTheGame = {
  id: "019ea4cb-dfec-703e-abdd-079ef3094cfc",
  pageTypeSlug: "song",
  slug: "sia-the-game",
  title: "The Game",
  artistSlug: "sia",
  externalId: "3d38c09d-3c7c-435a-a5bb-35c027145c23",
  externalLink: "https://musicbrainz.org/work/3d38c09d-3c7c-435a-a5bb-35c027145c23",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
