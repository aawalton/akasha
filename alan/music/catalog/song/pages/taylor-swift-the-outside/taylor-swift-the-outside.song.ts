import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheOutside = {
  id: "019ea416-3c4a-7bd5-8411-77eabb485d6e",
  type: "page-type/song",
  slug: "taylor-swift-the-outside",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bed40b3a-2786-4fc0-9e22-2bf143c93c1d",
      externalLink: "https://musicbrainz.org/work/bed40b3a-2786-4fc0-9e22-2bf143c93c1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Outside",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
