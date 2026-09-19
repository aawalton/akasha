import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLikeEveryoneSheKnows = {
  id: "01a0b72f-39d7-748f-b9a8-9067694fef9c",
  type: "page-type/song",
  slug: "james-taylor-like-everyone-she-knows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7f149cab-fc92-40a1-96c4-99e7caed107b",
      externalLink: "https://musicbrainz.org/work/7f149cab-fc92-40a1-96c4-99e7caed107b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Like Everyone She Knows",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
