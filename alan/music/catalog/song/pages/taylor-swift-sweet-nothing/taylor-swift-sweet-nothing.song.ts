import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSweetNothing = {
  id: "019ea416-3d58-7bf1-b4c3-05df677cf8ac",
  type: "page-type/song",
  slug: "taylor-swift-sweet-nothing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d35b7694-9858-4026-bdd2-424f9e9ff528",
      externalLink: "https://musicbrainz.org/work/d35b7694-9858-4026-bdd2-424f9e9ff528",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweet Nothing",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
