import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooYourLove = {
  id: "01a0b724-3954-796d-8b30-9b3919c0463d",
  type: "page-type/song",
  slug: "jisoo-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8140811-2511-4f14-943b-89e4882b1749",
      externalLink: "https://musicbrainz.org/work/d8140811-2511-4f14-943b-89e4882b1749",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Love",
  artist: "artist/jisoo",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
