import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLookingForLoveOnBroadway = {
  id: "01a0b72f-4249-75d3-865f-9fe0eae30a70",
  type: "page-type/song",
  slug: "james-taylor-looking-for-love-on-broadway",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d2c74e4a-7bbd-4921-ab83-b775aa5e546a",
      externalLink: "https://musicbrainz.org/work/d2c74e4a-7bbd-4921-ab83-b775aa5e546a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Looking for Love on Broadway",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
