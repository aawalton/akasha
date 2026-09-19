import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWrecked = {
  id: "019ea49c-9bdb-78c0-90d9-4af436a0a9ec",
  type: "page-type/song",
  slug: "imagine-dragons-wrecked",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "908fa8e6-1c6d-4240-9e09-841262940e90",
      externalLink: "https://musicbrainz.org/work/908fa8e6-1c6d-4240-9e09-841262940e90",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wrecked",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
