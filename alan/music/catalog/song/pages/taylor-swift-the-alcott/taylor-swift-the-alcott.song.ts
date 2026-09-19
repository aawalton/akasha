import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheAlcott = {
  id: "019ea416-3786-721a-a432-21758622a5d5",
  type: "page-type/song",
  slug: "taylor-swift-the-alcott",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76e74ffe-9eb7-46bc-bf29-f67f89710203",
      externalLink: "https://musicbrainz.org/work/76e74ffe-9eb7-46bc-bf29-f67f89710203",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Alcott",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
