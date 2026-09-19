import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDigital = {
  id: "019ea497-f566-78a7-9282-674d4b1dc847",
  type: "page-type/song",
  slug: "imagine-dragons-digital",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a514c67-f176-47be-a05e-f6a0fb83700f",
      externalLink: "https://musicbrainz.org/work/4a514c67-f176-47be-a05e-f6a0fb83700f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Digital",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
