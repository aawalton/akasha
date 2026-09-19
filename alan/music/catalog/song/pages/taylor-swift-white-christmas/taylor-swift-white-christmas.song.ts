import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhiteChristmas = {
  id: "019ea416-4439-7b5a-b231-6fa33724890e",
  type: "page-type/song",
  slug: "taylor-swift-white-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30daa999-81af-34c3-bf22-b3c1c41c8c01",
      externalLink: "https://musicbrainz.org/work/30daa999-81af-34c3-bf22-b3c1c41c8c01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Christmas",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
