import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraUnderStars = {
  id: "019ea4a3-0db8-7d4b-80b6-a7f4860f11bd",
  type: "page-type/song",
  slug: "aurora-under-stars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c7b93d8-caf4-477e-9fc4-2766888fd2c3",
      externalLink: "https://musicbrainz.org/work/0c7b93d8-caf4-477e-9fc4-2766888fd2c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Under Stars",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
