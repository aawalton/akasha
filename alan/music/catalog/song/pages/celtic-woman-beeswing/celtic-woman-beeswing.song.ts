import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBeeswing = {
  id: "01a0b720-11a8-70cf-bd1b-094f88c97606",
  type: "page-type/song",
  slug: "celtic-woman-beeswing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a2869cb7-2255-4593-be76-ea1b41a63b1e",
      externalLink: "https://musicbrainz.org/work/a2869cb7-2255-4593-be76-ea1b41a63b1e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beeswing",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
