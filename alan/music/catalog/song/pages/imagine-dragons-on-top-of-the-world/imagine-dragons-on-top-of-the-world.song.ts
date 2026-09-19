import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsOnTopOfTheWorld = {
  id: "019ea497-2e28-705a-95db-fa305173ce2f",
  type: "page-type/song",
  slug: "imagine-dragons-on-top-of-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "262f8d3a-464f-4539-8566-8ac92455dfce",
      externalLink: "https://musicbrainz.org/work/262f8d3a-464f-4539-8566-8ac92455dfce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On Top of the World",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
