import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGasoline = {
  id: "019ea416-2436-759a-84a5-b273a5d13da5",
  type: "page-type/song",
  slug: "taylor-swift-gasoline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91844bf6-b1de-4c3e-b119-26b8c35cc594",
      externalLink: "https://musicbrainz.org/work/91844bf6-b1de-4c3e-b119-26b8c35cc594",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gasoline",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
