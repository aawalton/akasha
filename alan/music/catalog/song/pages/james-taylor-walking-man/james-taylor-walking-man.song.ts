import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWalkingMan = {
  id: "01a0b72f-470d-7b8a-b7a9-8d97e41a2727",
  type: "page-type/song",
  slug: "james-taylor-walking-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18a98a38-fecb-4931-b316-5c45e962d28b",
      externalLink: "https://musicbrainz.org/work/18a98a38-fecb-4931-b316-5c45e962d28b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Walking Man",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
