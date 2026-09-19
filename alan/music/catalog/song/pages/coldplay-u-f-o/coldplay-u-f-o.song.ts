import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUFO = {
  id: "01a0ba60-f58a-748c-b187-17384f4e60b4",
  type: "page-type/song",
  slug: "coldplay-u-f-o",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "930ca77e-f515-435d-9edc-f655fed33174",
      externalLink: "https://musicbrainz.org/work/930ca77e-f515-435d-9edc-f655fed33174",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "U.F.O.",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
