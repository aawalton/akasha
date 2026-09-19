import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCircleRoundTheSun = {
  id: "01a0b72f-27ff-7d0d-a54b-817bf3fcdf65",
  type: "page-type/song",
  slug: "james-taylor-circle-round-the-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80c443ef-38ff-4c9b-a043-cd9cc8a16ce0",
      externalLink: "https://musicbrainz.org/work/80c443ef-38ff-4c9b-a043-cd9cc8a16ce0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Circle Round the Sun",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
