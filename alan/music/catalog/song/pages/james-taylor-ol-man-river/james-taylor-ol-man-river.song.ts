import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOlManRiver = {
  id: "01a0b72f-3850-7e70-b2b5-3b640758d4cd",
  type: "page-type/song",
  slug: "james-taylor-ol-man-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6567f3dd-ada0-37fb-a57d-1c53aa96e34a",
      externalLink: "https://musicbrainz.org/work/6567f3dd-ada0-37fb-a57d-1c53aa96e34a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ol’ Man River",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
