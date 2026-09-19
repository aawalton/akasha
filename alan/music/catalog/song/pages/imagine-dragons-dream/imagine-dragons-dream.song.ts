import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDream = {
  id: "019ea49a-3514-7158-9305-e433f4fb2de7",
  type: "page-type/song",
  slug: "imagine-dragons-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b7dd2a2b-8ab8-4ca7-87a6-fae26cc9e812",
      externalLink: "https://musicbrainz.org/work/b7dd2a2b-8ab8-4ca7-87a6-fae26cc9e812",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dream",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
