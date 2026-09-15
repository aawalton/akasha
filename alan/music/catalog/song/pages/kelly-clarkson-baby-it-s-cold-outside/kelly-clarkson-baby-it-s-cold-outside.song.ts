import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBabyItSColdOutside = {
  id: "019ea4ae-79c9-70b6-8443-ea0c551aa3a8",
  type: "song",
  slug: "kelly-clarkson-baby-it-s-cold-outside",
  title: "Baby, It’s Cold Outside",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5de0b9fc-f9ae-4c8b-ab69-3f62b64a06a0",
      externalLink: "https://musicbrainz.org/work/5de0b9fc-f9ae-4c8b-ab69-3f62b64a06a0",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
