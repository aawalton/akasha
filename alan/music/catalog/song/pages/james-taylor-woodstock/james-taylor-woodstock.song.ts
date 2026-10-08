import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWoodstock = {
  id: "01a0b72f-4cfe-779f-8bc2-be35c719e363",
  type: "page-type/song",
  slug: "james-taylor-woodstock",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b07c556-9d13-3b2e-a38d-d696ef98524c",
      externalLink: "https://musicbrainz.org/work/5b07c556-9d13-3b2e-a38d-d696ef98524c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Woodstock",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  createdAt: "2026-09-19T01:02:05.566Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
