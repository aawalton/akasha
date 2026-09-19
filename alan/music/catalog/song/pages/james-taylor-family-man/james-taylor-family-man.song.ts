import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFamilyMan = {
  id: "01a0b72f-2177-73cc-810d-dbc440f10915",
  type: "page-type/song",
  slug: "james-taylor-family-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2059d726-7071-431d-87a2-bf11d627b4b7",
      externalLink: "https://musicbrainz.org/work/2059d726-7071-431d-87a2-bf11d627b4b7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Family Man",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
