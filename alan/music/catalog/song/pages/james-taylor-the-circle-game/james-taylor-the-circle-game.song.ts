import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheCircleGame = {
  id: "01a0b72f-51d3-7a80-b40d-94693f6f1613",
  type: "page-type/song",
  slug: "james-taylor-the-circle-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad3155db-35cb-312f-b5a6-d15b3511b7c1",
      externalLink: "https://musicbrainz.org/work/ad3155db-35cb-312f-b5a6-d15b3511b7c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Circle Game",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
