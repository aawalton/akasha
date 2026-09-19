import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLabyrinth = {
  id: "019ea416-29c3-7070-b9d4-41150ee35b53",
  type: "page-type/song",
  slug: "taylor-swift-labyrinth",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d264e431-cb95-4751-9931-9eefadf4c1ee",
      externalLink: "https://musicbrainz.org/work/d264e431-cb95-4751-9931-9eefadf4c1ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Labyrinth",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
