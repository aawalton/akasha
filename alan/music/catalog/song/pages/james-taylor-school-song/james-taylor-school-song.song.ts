import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSchoolSong = {
  id: "01a0b72f-50da-7fee-85e7-b69ef3b613ea",
  type: "page-type/song",
  slug: "james-taylor-school-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "94d3629f-83a5-39ba-9fb4-ffbbbdfc0569",
      externalLink: "https://musicbrainz.org/work/94d3629f-83a5-39ba-9fb4-ffbbbdfc0569",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "School Song",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  createdAt: "2026-09-19T01:02:06.554Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
