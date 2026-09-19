import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNoTimeForToxicPeople = {
  id: "019ea497-361c-7c9b-b1aa-a56d1d4efb9b",
  type: "page-type/song",
  slug: "imagine-dragons-no-time-for-toxic-people",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2cc96db3-c155-4bc8-b589-32897d048599",
      externalLink: "https://musicbrainz.org/work/2cc96db3-c155-4bc8-b589-32897d048599",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No Time for Toxic People",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
