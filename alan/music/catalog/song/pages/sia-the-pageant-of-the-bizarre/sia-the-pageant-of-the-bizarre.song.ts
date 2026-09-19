import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaThePageantOfTheBizarre = {
  id: "019ea4cd-c7ae-7f05-9418-e354290279ec",
  type: "page-type/song",
  slug: "sia-the-pageant-of-the-bizarre",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b60b415d-0f8c-4809-b062-d89d288877c0",
      externalLink: "https://musicbrainz.org/work/b60b415d-0f8c-4809-b062-d89d288877c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Pageant of the Bizarre",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
