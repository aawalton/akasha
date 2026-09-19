import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSometimes = {
  id: "019ea4e6-67ee-7261-82c0-d8de490495ce",
  type: "page-type/song",
  slug: "ariana-grande-sometimes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9555d836-0483-486c-b90f-f08eb66c8c3a",
      externalLink: "https://musicbrainz.org/work/9555d836-0483-486c-b90f-f08eb66c8c3a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sometimes",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
