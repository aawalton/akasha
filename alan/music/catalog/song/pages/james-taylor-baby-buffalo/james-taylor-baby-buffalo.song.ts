import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBabyBuffalo = {
  id: "01a0b72f-22c2-71b5-abdc-32a10f53282a",
  type: "page-type/song",
  slug: "james-taylor-baby-buffalo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2911deb4-3d4e-4581-a77b-510693c4c3e4",
      externalLink: "https://musicbrainz.org/work/2911deb4-3d4e-4581-a77b-510693c4c3e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby Buffalo",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
