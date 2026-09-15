import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsUnderdog = {
  id: "019ea49c-5138-7139-be66-6f2aa10408fb",
  type: "song",
  slug: "imagine-dragons-underdog",
  title: "Underdog",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "722eeed8-2c41-4f01-ba43-4005372317d6",
      externalLink: "https://musicbrainz.org/work/722eeed8-2c41-4f01-ba43-4005372317d6",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
