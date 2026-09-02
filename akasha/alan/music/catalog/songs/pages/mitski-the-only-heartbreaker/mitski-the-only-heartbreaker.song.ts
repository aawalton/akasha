import type { Song } from "../../song.page-type.ts"

export const mitskiTheOnlyHeartbreaker = {
  id: "019f0e9f-ed2e-77f6-8b23-292a33653ab8",
  pageTypeSlug: "song",
  slug: "mitski-the-only-heartbreaker",
  title: "The Only Heartbreaker",
  artistSlug: "mitski",
  externalId: "47bb0fd7-308b-4aff-99bb-031d59f867e9",
  externalLink: "https://musicbrainz.org/work/47bb0fd7-308b-4aff-99bb-031d59f867e9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
