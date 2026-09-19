import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBabyItSColdOutside = {
  id: "019ea4ae-79c9-70b6-8443-ea0c551aa3a8",
  type: "page-type/song",
  slug: "kelly-clarkson-baby-it-s-cold-outside",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      externalLink: "https://musicbrainz.org/work/c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby, It’s Cold Outside",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
