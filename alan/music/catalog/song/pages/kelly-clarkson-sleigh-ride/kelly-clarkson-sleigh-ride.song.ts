import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSleighRide = {
  id: "019ea4b2-9a30-7eaf-9848-8bdc1cb1ddd6",
  type: "page-type/song",
  slug: "kelly-clarkson-sleigh-ride",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "77432d89-9968-300d-9eee-d5b2a8fafaea",
      externalLink: "https://musicbrainz.org/work/77432d89-9968-300d-9eee-d5b2a8fafaea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sleigh Ride",
  artist: "artist/kelly-clarkson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
