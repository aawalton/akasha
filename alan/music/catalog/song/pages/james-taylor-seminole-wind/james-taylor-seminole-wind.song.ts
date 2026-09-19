import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSeminoleWind = {
  id: "01a0b72f-57cd-708b-9acb-efa1b58d7b8d",
  type: "page-type/song",
  slug: "james-taylor-seminole-wind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e9860686-715f-3a57-aa50-342e8c5e30d7",
      externalLink: "https://musicbrainz.org/work/e9860686-715f-3a57-aa50-342e8c5e30d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Seminole Wind",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
