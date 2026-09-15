import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonNeverEnough = {
  id: "019ea4ad-0687-777e-94d5-d5b13d8fbe93",
  type: "song",
  slug: "kelly-clarkson-never-enough",
  title: "Never Enough",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1482f51f-a76a-43b5-bdf9-12ab254ebf21",
      externalLink: "https://musicbrainz.org/work/1482f51f-a76a-43b5-bdf9-12ab254ebf21",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
