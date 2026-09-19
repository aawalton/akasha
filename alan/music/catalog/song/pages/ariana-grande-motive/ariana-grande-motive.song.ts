import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMotive = {
  id: "019ea4e5-d83c-7816-a5bc-255bc35fca92",
  type: "page-type/song",
  slug: "ariana-grande-motive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a6e99dc-64f6-40b9-bc55-9a344f5c43aa",
      externalLink: "https://musicbrainz.org/work/6a6e99dc-64f6-40b9-bc55-9a344f5c43aa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "motive",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
