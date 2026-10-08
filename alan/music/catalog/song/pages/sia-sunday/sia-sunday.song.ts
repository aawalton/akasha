import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSunday = {
  id: "019ea4ce-3841-70c6-97b3-19ff2bfd7360",
  type: "page-type/song",
  slug: "sia-sunday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db97b949-0b2a-4811-881c-f70ef71363c6",
      externalLink: "https://musicbrainz.org/work/db97b949-0b2a-4811-881c-f70ef71363c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunday",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:17:18.785Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
