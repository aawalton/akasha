import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaRockAndBalloon = {
  id: "019ea4cb-bb51-704a-a807-c078fcf66f26",
  type: "page-type/song",
  slug: "sia-rock-and-balloon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37e2162c-dd44-4c6f-b944-e9d94098081e",
      externalLink: "https://musicbrainz.org/work/37e2162c-dd44-4c6f-b944-e9d94098081e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rock and Balloon",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
