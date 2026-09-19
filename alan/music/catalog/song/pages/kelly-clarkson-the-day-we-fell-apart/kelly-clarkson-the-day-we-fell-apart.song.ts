import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTheDayWeFellApart = {
  id: "019ea4b1-e24e-799b-b76d-037b9e67261b",
  type: "page-type/song",
  slug: "kelly-clarkson-the-day-we-fell-apart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35ebbbac-6112-3902-8843-dd692cf40e9d",
      externalLink: "https://musicbrainz.org/work/35ebbbac-6112-3902-8843-dd692cf40e9d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Day We Fell Apart",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
