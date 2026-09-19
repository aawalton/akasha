import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRunawayBoy = {
  id: "01a0b72f-3223-7cba-8872-0afe0ed086e6",
  type: "page-type/song",
  slug: "james-taylor-runaway-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "043aa603-7310-4247-aece-72732afca040",
      externalLink: "https://musicbrainz.org/work/043aa603-7310-4247-aece-72732afca040",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Runaway Boy",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
