import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLoveAndSunsets = {
  id: "01a0b72f-3ad0-7796-a02e-e6e22cda7b6d",
  type: "page-type/song",
  slug: "james-taylor-love-and-sunsets",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "903402c0-35a3-4882-97c9-add15b19b057",
      externalLink: "https://musicbrainz.org/work/903402c0-35a3-4882-97c9-add15b19b057",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love and Sunsets",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
