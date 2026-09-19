import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHouseOnFire = {
  id: "019ea4c6-9c4b-7a14-a54f-2c3b00220f11",
  type: "page-type/song",
  slug: "sia-house-on-fire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "026518e8-2a05-48ed-9eb4-41b3019763e8",
      externalLink: "https://musicbrainz.org/work/026518e8-2a05-48ed-9eb4-41b3019763e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "House on Fire",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
