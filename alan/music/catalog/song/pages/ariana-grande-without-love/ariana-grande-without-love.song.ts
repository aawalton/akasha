import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWithoutLove = {
  id: "019ea4e4-562f-72e7-bdc8-44976f08d349",
  type: "page-type/song",
  slug: "ariana-grande-without-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2802f105-1f19-3538-a716-08efe5abad72",
      externalLink: "https://musicbrainz.org/work/2802f105-1f19-3538-a716-08efe5abad72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Without Love",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
