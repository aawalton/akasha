import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSlapLeather = {
  id: "01a0b72f-4ad6-74d7-8aa9-21ff67aeb99e",
  type: "page-type/song",
  slug: "james-taylor-slap-leather",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "451c8ad3-78ca-3080-88ec-715fabcb9d0f",
      externalLink: "https://musicbrainz.org/work/451c8ad3-78ca-3080-88ec-715fabcb9d0f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Slap Leather",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
