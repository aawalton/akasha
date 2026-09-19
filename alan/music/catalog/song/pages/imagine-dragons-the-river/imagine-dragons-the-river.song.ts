import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTheRiver = {
  id: "019ea49d-4434-783a-a04c-abad258d3b65",
  type: "page-type/song",
  slug: "imagine-dragons-the-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f969c46e-1f48-48f0-97fc-3d90b538b862",
      externalLink: "https://musicbrainz.org/work/f969c46e-1f48-48f0-97fc-3d90b538b862",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The River",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
