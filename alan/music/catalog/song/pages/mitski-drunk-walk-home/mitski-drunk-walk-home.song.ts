import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiDrunkWalkHome = {
  id: "019f0ea4-4fcf-706f-a78b-bc2fd3c9570e",
  type: "page-type/song",
  slug: "mitski-drunk-walk-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97a25344-eccb-4525-b186-b1d2c16e1f78",
      externalLink: "https://musicbrainz.org/work/97a25344-eccb-4525-b186-b1d2c16e1f78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Drunk Walk Home",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:31:17.199Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
