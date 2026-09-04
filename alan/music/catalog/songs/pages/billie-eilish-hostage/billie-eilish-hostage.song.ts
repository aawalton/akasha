import type { Song } from "../../song.page-type.ts"

export const billieEilishHostage = {
  id: "019ea4a9-7377-7013-93f4-7cec6a15d0a1",
  pageTypeSlug: "song",
  slug: "billie-eilish-hostage",
  title: "hostage",
  artistSlug: "billie-eilish",
  externalId: "4f699513-536a-402c-935b-b7b322e0ed62",
  externalLink: "https://musicbrainz.org/work/4f699513-536a-402c-935b-b7b322e0ed62",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
