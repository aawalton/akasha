import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftJumpThenFall = {
  id: "019ea416-2161-70cc-9793-f98d5f143883",
  type: "page-type/song",
  slug: "taylor-swift-jump-then-fall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6fb37e3c-023b-49b8-9050-4a18c049d1d1",
      externalLink: "https://musicbrainz.org/work/6fb37e3c-023b-49b8-9050-4a18c049d1d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jump Then Fall",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
