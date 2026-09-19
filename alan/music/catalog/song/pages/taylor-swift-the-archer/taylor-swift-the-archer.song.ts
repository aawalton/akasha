import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheArcher = {
  id: "019ea416-2e1d-753d-ae73-2a8a1faebdec",
  type: "page-type/song",
  slug: "taylor-swift-the-archer",
  rank: "S-",
  tags: ["relationships", "masking"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08c58cba-5b1d-4593-9e3b-e3d50c043f24",
      externalLink: "https://musicbrainz.org/work/08c58cba-5b1d-4593-9e3b-e3d50c043f24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Archer",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
