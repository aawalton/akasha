import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBabyBoomBaby = {
  id: "01a0b72f-20db-748b-ad30-6a79d3a28e1f",
  type: "page-type/song",
  slug: "james-taylor-baby-boom-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1cd9778b-93d8-482c-b3ca-6f9ea72b5711",
      externalLink: "https://musicbrainz.org/work/1cd9778b-93d8-482c-b3ca-6f9ea72b5711",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby Boom Baby",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
