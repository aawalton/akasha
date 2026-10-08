import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSeptemberGrass = {
  id: "01a0b72f-5291-7816-b1f0-b5fa211b246d",
  type: "page-type/song",
  slug: "james-taylor-september-grass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8527896-7c09-4986-94aa-cb3c6fd80556",
      externalLink: "https://musicbrainz.org/work/b8527896-7c09-4986-94aa-cb3c6fd80556",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "September Grass",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  createdAt: "2026-09-19T01:02:06.993Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
