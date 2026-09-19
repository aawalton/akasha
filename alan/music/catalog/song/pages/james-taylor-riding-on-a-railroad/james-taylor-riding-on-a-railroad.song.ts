import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRidingOnARailroad = {
  id: "01a0b72f-3a34-7e66-83e0-555dd3134c53",
  type: "page-type/song",
  slug: "james-taylor-riding-on-a-railroad",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a30ec72-dad5-4846-a4e9-26760211a93e",
      externalLink: "https://musicbrainz.org/work/8a30ec72-dad5-4846-a4e9-26760211a93e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Riding on a Railroad",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
