import type { Song } from "../../song.page-type.ts"

export const auroraInAMinute = {
  id: "019ea4a5-6467-7e22-9941-ec4b1128a9f7",
  pageTypeSlug: "song",
  slug: "aurora-in-a-minute",
  title: "IN A MINUTE",
  artistSlug: "aurora",
  externalId: "63d05f11-9a9d-467a-9493-cc638891e343",
  externalLink: "https://musicbrainz.org/work/63d05f11-9a9d-467a-9493-cc638891e343",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
