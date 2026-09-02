import type { Song } from "../../song.page-type.ts"

export const siaRockAndBalloon = {
  id: "019ea4cb-bb51-704a-a807-c078fcf66f26",
  pageTypeSlug: "song",
  slug: "sia-rock-and-balloon",
  title: "Rock and Balloon",
  artistSlug: "sia",
  externalId: "37e2162c-dd44-4c6f-b944-e9d94098081e",
  externalLink: "https://musicbrainz.org/work/37e2162c-dd44-4c6f-b944-e9d94098081e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
