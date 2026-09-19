import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanRainbow = {
  id: "01a0b720-12b9-758d-ba1d-d16d2a954a3d",
  type: "page-type/song",
  slug: "celtic-woman-rainbow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bcf3483e-ae72-4085-a66b-5f50cf41eea2",
      externalLink: "https://musicbrainz.org/work/bcf3483e-ae72-4085-a66b-5f50cf41eea2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainbow",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
