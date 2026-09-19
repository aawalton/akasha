import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheBolter = {
  id: "019ea416-3c7f-72e2-bfd7-4ea480d2c556",
  type: "page-type/song",
  slug: "taylor-swift-the-bolter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5269eba-eb09-4f50-be25-696a65084de5",
      externalLink: "https://musicbrainz.org/work/c5269eba-eb09-4f50-be25-696a65084de5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Bolter",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
