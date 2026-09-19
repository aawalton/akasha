import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaJesusWept = {
  id: "019ea4c7-e41b-7861-96f4-66e82de82edb",
  type: "page-type/song",
  slug: "sia-jesus-wept",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d21ad95-1655-49f3-aca6-a46a09b85a05",
      externalLink: "https://musicbrainz.org/work/5d21ad95-1655-49f3-aca6-a46a09b85a05",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jesus Wept",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
