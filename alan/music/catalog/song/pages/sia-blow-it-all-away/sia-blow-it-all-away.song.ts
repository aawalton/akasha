import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBlowItAllAway = {
  id: "019ea4c2-ccc9-7f58-98d5-07365e219ee1",
  type: "page-type/song",
  slug: "sia-blow-it-all-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0ed081f0-e051-40ac-8bde-03fac2a86d07",
      externalLink: "https://musicbrainz.org/work/0ed081f0-e051-40ac-8bde-03fac2a86d07",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blow It All Away",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:04:50.377Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
