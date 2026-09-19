import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLifeInTechnicolorIi = {
  id: "01a0ba60-f500-713c-94d8-68ddd2d2c659",
  type: "page-type/song",
  slug: "coldplay-life-in-technicolor-ii",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8b88ac40-37fa-386d-919d-6c687558d137",
      externalLink: "https://musicbrainz.org/work/8b88ac40-37fa-386d-919d-6c687558d137",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Life in Technicolor ii",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
