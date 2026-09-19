import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMyTravelingStar = {
  id: "01a0b72f-4515-7d25-a4f4-62caf14469e3",
  type: "page-type/song",
  slug: "james-taylor-my-traveling-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f94de6d6-3fc0-38a0-a65c-f0449eda5148",
      externalLink: "https://musicbrainz.org/work/f94de6d6-3fc0-38a0-a65c-f0449eda5148",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Traveling Star",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
