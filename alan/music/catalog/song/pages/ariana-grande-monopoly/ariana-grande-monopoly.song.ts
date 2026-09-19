import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMonopoly = {
  id: "019ea4e7-ddd4-7ac6-add4-3e3aea0296c4",
  type: "page-type/song",
  slug: "ariana-grande-monopoly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e09bce07-36b2-45fd-aa16-2d7106eb5237",
      externalLink: "https://musicbrainz.org/work/e09bce07-36b2-45fd-aa16-2d7106eb5237",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Monopoly",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
