import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDearReader = {
  id: "019ea416-0f9b-79ae-adca-02e0b0dcf2e8",
  type: "page-type/song",
  slug: "taylor-swift-dear-reader",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
      externalLink: "https://musicbrainz.org/work/9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dear Reader",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.755Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
