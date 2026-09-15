import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLabyrinth = {
  id: "019ea416-29c3-7070-b9d4-41150ee35b53",
  type: "page-type/song",
  slug: "taylor-swift-labyrinth",
  title: "Labyrinth",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d264e431-cb95-4751-9931-9eefadf4c1ee",
      externalLink: "https://musicbrainz.org/work/d264e431-cb95-4751-9931-9eefadf4c1ee",
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
