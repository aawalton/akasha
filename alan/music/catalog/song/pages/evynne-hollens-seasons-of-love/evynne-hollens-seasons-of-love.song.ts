import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensSeasonsOfLove = {
  id: "019ea4cf-2eb4-79dd-86eb-338d0bc43f03",
  type: "page-type/song",
  slug: "evynne-hollens-seasons-of-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "56e63873-a432-44aa-94ac-549594fc9c82",
      externalLink: "https://musicbrainz.org/work/56e63873-a432-44aa-94ac-549594fc9c82",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Seasons of Love",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
