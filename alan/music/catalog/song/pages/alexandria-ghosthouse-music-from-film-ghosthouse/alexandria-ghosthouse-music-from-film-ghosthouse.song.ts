import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaGhosthouseMusicFromFilmGhosthouse = {
  id: "01a0b726-8e73-7299-8192-4fbc13d8680a",
  type: "page-type/song",
  slug: "alexandria-ghosthouse-music-from-film-ghosthouse",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b0d06133-96d1-4169-bb65-57bd97056188",
      externalLink: "https://musicbrainz.org/recording/b0d06133-96d1-4169-bb65-57bd97056188",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ghosthouse (music from film ''Ghosthouse'')",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
