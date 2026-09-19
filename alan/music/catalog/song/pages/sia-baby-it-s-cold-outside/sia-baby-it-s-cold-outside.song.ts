import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBabyItSColdOutside = {
  id: "019ea4b0-07df-704b-9b51-90354da08573",
  type: "page-type/song",
  slug: "sia-baby-it-s-cold-outside",
  partOfCollections: ["artist/james-taylor", "artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      externalLink: "https://musicbrainz.org/work/c69fec1c-1ec7-3c36-a7e9-e65653cd7c45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Baby, It’s Cold Outside",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
