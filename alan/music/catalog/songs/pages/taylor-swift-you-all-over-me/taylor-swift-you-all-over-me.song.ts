import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftYouAllOverMe = {
  id: "019ea416-4384-7518-a0b8-98d478c28fad",
  type: "song",
  slug: "taylor-swift-you-all-over-me",
  title: "You All Over Me",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18da03fe-9375-4622-b14b-d29acb595085",
      externalLink: "https://musicbrainz.org/work/18da03fe-9375-4622-b14b-d29acb595085",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
