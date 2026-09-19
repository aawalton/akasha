import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomeDaysYouGottaDance = {
  id: "01a0b72f-58bc-7dac-9645-7bf47876e9a4",
  type: "page-type/song",
  slug: "james-taylor-some-days-you-gotta-dance",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f14cf604-7a6c-4b21-9c80-e39fb462ddf9",
      externalLink: "https://musicbrainz.org/work/f14cf604-7a6c-4b21-9c80-e39fb462ddf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Some Days You Gotta Dance",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
