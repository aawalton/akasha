import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensGodOnlyKnows = {
  id: "019ea4cf-3f4e-7c78-95af-2c33b0c5300d",
  type: "page-type/song",
  slug: "evynne-hollens-god-only-knows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "75869198-e882-383d-bca4-b3f304c69ca2",
      externalLink: "https://musicbrainz.org/work/75869198-e882-383d-bca4-b3f304c69ca2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "God Only Knows",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
