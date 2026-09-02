import type { Song } from "../../song.page-type.ts"

export const arianaGrandeOneHeartOneVoice = {
  id: "019ea4e6-1fb9-72fc-b84c-3fc3c7f8a45f",
  pageTypeSlug: "song",
  slug: "ariana-grande-one-heart-one-voice",
  title: "One Heart, One Voice",
  artistSlug: "ariana-grande",
  externalId: "81f35778-8c89-4f80-8c70-14f8abe2ba81",
  externalLink: "https://musicbrainz.org/work/81f35778-8c89-4f80-8c70-14f8abe2ba81",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
