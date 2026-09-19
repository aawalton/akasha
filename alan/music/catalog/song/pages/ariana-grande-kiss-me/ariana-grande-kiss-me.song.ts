import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeKissMe = {
  id: "01a0b76f-eb85-74ff-919e-65f814c49c13",
  type: "page-type/song",
  slug: "ariana-grande-kiss-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3b42f1ed-4db3-47bb-bc59-1d2d800f51e3",
      externalLink: "https://musicbrainz.org/work/3b42f1ed-4db3-47bb-bc59-1d2d800f51e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "kiss me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
