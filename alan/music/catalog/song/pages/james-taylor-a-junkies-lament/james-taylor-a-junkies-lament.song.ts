import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAJunkiesLament = {
  id: "01a0b72f-312d-7437-9267-16987c05ad3d",
  type: "page-type/song",
  slug: "james-taylor-a-junkies-lament",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed7fafeb-3f3d-4848-88f8-bcc76828a9ba",
      externalLink: "https://musicbrainz.org/work/ed7fafeb-3f3d-4848-88f8-bcc76828a9ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Junkie’s Lament",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
