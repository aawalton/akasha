import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDemons = {
  id: "019ea497-b4e4-790d-89be-6f734eb98cf7",
  type: "page-type/song",
  slug: "imagine-dragons-demons",
  title: "Demons",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "42462391-3cdb-4af6-8a6c-386021ea6d6c",
      externalLink: "https://musicbrainz.org/work/42462391-3cdb-4af6-8a6c-386021ea6d6c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  rank: "S-",
  singability: "S-",
  tags: ["masking"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
