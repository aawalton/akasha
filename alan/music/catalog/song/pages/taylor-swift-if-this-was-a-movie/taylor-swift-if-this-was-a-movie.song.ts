import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIfThisWasAMovie = {
  id: "019ea416-26ed-7b5b-8224-97c1f1773ef3",
  type: "page-type/song",
  slug: "taylor-swift-if-this-was-a-movie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3e8fdf9-29d0-4fda-9732-6f59839959c8",
      externalLink: "https://musicbrainz.org/work/a3e8fdf9-29d0-4fda-9732-6f59839959c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If This Was a Movie",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
