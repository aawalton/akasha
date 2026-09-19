import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWakeUp = {
  id: "019ea49b-920b-710b-9f70-74c9d3216c80",
  type: "page-type/song",
  slug: "imagine-dragons-wake-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1b7aa1e5-7e3c-4021-8ceb-575fdd3680f3",
      externalLink: "https://musicbrainz.org/work/1b7aa1e5-7e3c-4021-8ceb-575fdd3680f3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wake Up",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
