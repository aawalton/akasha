import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSnowOnTheBeach = {
  id: "019ea416-3dbf-74cb-bb79-4554c17aa1a3",
  type: "page-type/song",
  slug: "taylor-swift-snow-on-the-beach",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d48b6516-f503-48a8-b15d-c0b6f46c8622",
      externalLink: "https://musicbrainz.org/work/d48b6516-f503-48a8-b15d-c0b6f46c8622",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Snow on the Beach",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
