import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSparksFly = {
  id: "019ea416-2f4c-7375-9f97-4cf14a9f8378",
  type: "page-type/song",
  slug: "taylor-swift-sparks-fly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1c6b7922-2cd5-3e67-b6db-5e2d6c1dee9d",
      externalLink: "https://musicbrainz.org/work/1c6b7922-2cd5-3e67-b6db-5e2d6c1dee9d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sparks Fly",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
