import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLakes = {
  id: "019ea416-3852-750f-a526-ff2e1cb043db",
  type: "song",
  slug: "taylor-swift-the-lakes",
  title: "the lakes",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7cf336af-9d60-4b9d-9c99-82e86fc7a8e3",
      externalLink: "https://musicbrainz.org/work/7cf336af-9d60-4b9d-9c99-82e86fc7a8e3",
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
