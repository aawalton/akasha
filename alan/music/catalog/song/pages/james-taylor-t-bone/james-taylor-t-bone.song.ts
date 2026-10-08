import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTBone = {
  id: "01a0b72f-5a37-793f-8c5e-f906a3b33ef9",
  type: "page-type/song",
  slug: "james-taylor-t-bone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fccbedd7-40a9-4e3e-9d4f-f105b3f68558",
      externalLink: "https://musicbrainz.org/work/fccbedd7-40a9-4e3e-9d4f-f105b3f68558",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "T-Bone",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:08.951Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
