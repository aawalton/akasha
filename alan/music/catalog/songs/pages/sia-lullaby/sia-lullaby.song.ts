import type { Song } from "../../song.page-type.ts"

export const siaLullaby = {
  id: "019ea4ca-0190-794c-8d79-7562bd62fb74",
  pageTypeSlug: "song",
  slug: "sia-lullaby",
  title: "Lullaby",
  artistSlug: "sia",
  externalId: "dbc696dc-09ff-4382-8e69-fec7a967878d",
  externalLink: "https://musicbrainz.org/work/dbc696dc-09ff-4382-8e69-fec7a967878d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
