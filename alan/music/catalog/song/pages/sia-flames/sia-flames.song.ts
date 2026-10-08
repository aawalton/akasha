import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFlames = {
  id: "019ea4c8-a4be-7fec-af55-cdd68c1ef3d7",
  type: "page-type/song",
  slug: "sia-flames",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7aa8f2e4-3354-4ba3-8a2b-be55b94fd399",
      externalLink: "https://musicbrainz.org/work/7aa8f2e4-3354-4ba3-8a2b-be55b94fd399",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flames",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:11:13.342Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
