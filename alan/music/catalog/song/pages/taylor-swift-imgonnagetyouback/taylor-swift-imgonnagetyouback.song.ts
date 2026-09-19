import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftImgonnagetyouback = {
  id: "019ea416-18f6-7a79-ac56-ad0cde965d37",
  type: "page-type/song",
  slug: "taylor-swift-imgonnagetyouback",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0ac37201-e79d-4c45-a0a2-e39118642f1b",
      externalLink: "https://musicbrainz.org/work/0ac37201-e79d-4c45-a0a2-e39118642f1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "imgonnagetyouback",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
