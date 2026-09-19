import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMothership = {
  id: "019ea4a6-02b5-79e1-9bf9-8e71c980f261",
  type: "page-type/song",
  slug: "aurora-mothership",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7e3edeb7-4aa5-48ff-a9a3-c91b62ea9108",
      externalLink: "https://musicbrainz.org/work/7e3edeb7-4aa5-48ff-a9a3-c91b62ea9108",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mothership",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
