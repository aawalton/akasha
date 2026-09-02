import type { Song } from "../../song.page-type.ts"

export const auroraLucky = {
  id: "019ea4a3-1a69-7a6e-96ec-89b38689d246",
  pageTypeSlug: "song",
  slug: "aurora-lucky",
  title: "Lucky",
  artistSlug: "aurora",
  externalId: "0e24cbef-6442-4e21-998d-ab1d08b795ed",
  externalLink: "https://musicbrainz.org/work/0e24cbef-6442-4e21-998d-ab1d08b795ed",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
