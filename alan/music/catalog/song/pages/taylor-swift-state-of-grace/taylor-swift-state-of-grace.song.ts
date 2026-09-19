import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftStateOfGrace = {
  id: "019ea416-362e-72fa-9d0b-c2096a0f4f15",
  type: "page-type/song",
  slug: "taylor-swift-state-of-grace",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65bdb1d3-a969-4dde-967a-9cfa67d0168c",
      externalLink: "https://musicbrainz.org/work/65bdb1d3-a969-4dde-967a-9cfa67d0168c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "State of Grace",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
