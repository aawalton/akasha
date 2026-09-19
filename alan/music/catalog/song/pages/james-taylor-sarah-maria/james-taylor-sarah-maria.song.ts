import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSarahMaria = {
  id: "01a0b72f-59e6-70ed-9750-031b3ef79674",
  type: "page-type/song",
  slug: "james-taylor-sarah-maria",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc7110ae-7128-429e-8ca6-10ebd00dcc2d",
      externalLink: "https://musicbrainz.org/work/fc7110ae-7128-429e-8ca6-10ebd00dcc2d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sarah Maria",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
