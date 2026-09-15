import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDearReader = {
  id: "019ea416-0f9b-79ae-adca-02e0b0dcf2e8",
  type: "song",
  slug: "taylor-swift-dear-reader",
  title: "Dear Reader",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
      externalLink: "https://musicbrainz.org/work/9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
