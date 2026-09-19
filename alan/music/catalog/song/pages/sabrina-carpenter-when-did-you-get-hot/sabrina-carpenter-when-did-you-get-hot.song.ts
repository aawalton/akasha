import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWhenDidYouGetHot = {
  id: "01a0b723-d12b-7a8b-bbdc-b0c7e5c28ce1",
  type: "page-type/song",
  slug: "sabrina-carpenter-when-did-you-get-hot",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08771852-7682-4b40-a9eb-cffe0d6319be",
      externalLink: "https://musicbrainz.org/work/08771852-7682-4b40-a9eb-cffe0d6319be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When Did You Get Hot?",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
