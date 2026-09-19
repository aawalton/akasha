import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHaveYourselfAMerryLittleChristmas = {
  id: "01a0b72f-22f1-74c1-af2d-945b30bb756f",
  type: "page-type/song",
  slug: "james-taylor-have-yourself-a-merry-little-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff51d26-cc88-443e-83b9-baf9cf244112",
      externalLink: "https://musicbrainz.org/work/2ff51d26-cc88-443e-83b9-baf9cf244112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
