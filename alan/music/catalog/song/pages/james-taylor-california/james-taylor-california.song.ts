import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCalifornia = {
  id: "01a0b72f-258e-759b-8d50-2d2fb367ae83",
  type: "page-type/song",
  slug: "james-taylor-california",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b88a0d7-0c99-39cd-8bb9-79c1ca078aa5",
      externalLink: "https://musicbrainz.org/work/5b88a0d7-0c99-39cd-8bb9-79c1ca078aa5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "California",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:01:55.470Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
