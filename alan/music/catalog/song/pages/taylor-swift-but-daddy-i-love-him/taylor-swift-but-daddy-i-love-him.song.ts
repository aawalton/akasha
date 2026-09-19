import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftButDaddyILoveHim = {
  id: "019ea416-103b-7e77-8dd5-38d48bc02f64",
  type: "page-type/song",
  slug: "taylor-swift-but-daddy-i-love-him",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9fd277d4-4ada-4516-aa90-7fdc2b80f5fe",
      externalLink: "https://musicbrainz.org/work/9fd277d4-4ada-4516-aa90-7fdc2b80f5fe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "But Daddy I Love Him",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
