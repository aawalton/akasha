import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAwayInAManger = {
  id: "01a0b720-1029-7923-94a3-eb097b7af67e",
  type: "page-type/song",
  slug: "celtic-woman-away-in-a-manger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      externalLink: "https://musicbrainz.org/work/88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Away in a Manger",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
