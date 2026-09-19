import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLoml = {
  id: "019ea416-1d7a-744a-ad2f-2ee484405436",
  type: "page-type/song",
  slug: "taylor-swift-loml",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ebe6704-cd95-40de-b171-73c2e82d8ad7",
      externalLink: "https://musicbrainz.org/work/3ebe6704-cd95-40de-b171-73c2e82d8ad7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "loml",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
