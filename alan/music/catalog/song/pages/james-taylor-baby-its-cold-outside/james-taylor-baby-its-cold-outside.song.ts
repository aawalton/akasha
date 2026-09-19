import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBabyItsColdOutside = {
  id: "01a0b72f-2eea-78ae-9bca-71059fe6887d",
  type: "page-type/song",
  slug: "james-taylor-baby-its-cold-outside",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      externalLink: "https://musicbrainz.org/work/c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby, It’s Cold Outside",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
