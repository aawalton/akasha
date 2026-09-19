import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorJig = {
  id: "01a0b72f-3a6b-7ae1-a54f-31b8cb5a5aee",
  type: "page-type/song",
  slug: "james-taylor-jig",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8dcd959c-5ab7-4d02-952e-a4ba8df8706c",
      externalLink: "https://musicbrainz.org/work/8dcd959c-5ab7-4d02-952e-a4ba8df8706c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jig",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
