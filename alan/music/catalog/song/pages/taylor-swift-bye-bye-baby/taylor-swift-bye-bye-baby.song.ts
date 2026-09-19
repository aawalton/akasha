import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftByeByeBaby = {
  id: "019ea416-1677-757e-a53e-c0c5d6718c73",
  type: "page-type/song",
  slug: "taylor-swift-bye-bye-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ddc5b9da-a921-41f6-bd8e-26f5b0f28dc3",
      externalLink: "https://musicbrainz.org/work/ddc5b9da-a921-41f6-bd8e-26f5b0f28dc3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bye Bye Baby",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
