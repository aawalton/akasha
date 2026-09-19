import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLastGreatAmericanDynasty = {
  id: "019ea416-3e8d-7e80-9bc9-08acdc0d5473",
  type: "page-type/song",
  slug: "taylor-swift-the-last-great-american-dynasty",
  rank: "A-",
  tags: ["wealth"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dfc9ac83-8073-4cf8-90d1-3f2fcc1a2409",
      externalLink: "https://musicbrainz.org/work/dfc9ac83-8073-4cf8-90d1-3f2fcc1a2409",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "the last great american dynasty",
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
