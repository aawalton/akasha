import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMyOldMan = {
  id: "01a0b72f-371d-7897-9731-9ee5679d313a",
  type: "page-type/song",
  slug: "james-taylor-my-old-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "56bd051c-7477-3c83-9b23-3260629e5ae3",
      externalLink: "https://musicbrainz.org/work/56bd051c-7477-3c83-9b23-3260629e5ae3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Old Man",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
