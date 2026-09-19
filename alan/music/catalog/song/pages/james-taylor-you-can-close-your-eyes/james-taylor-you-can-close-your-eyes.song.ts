import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYouCanCloseYourEyes = {
  id: "01a0b72f-4d2d-7def-ad25-7be00a59af75",
  type: "page-type/song",
  slug: "james-taylor-you-can-close-your-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d4ef55f-e9f2-38a6-9ed0-9ec0b23e64ac",
      externalLink: "https://musicbrainz.org/work/5d4ef55f-e9f2-38a6-9ed0-9ec0b23e64ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Can Close Your Eyes",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
