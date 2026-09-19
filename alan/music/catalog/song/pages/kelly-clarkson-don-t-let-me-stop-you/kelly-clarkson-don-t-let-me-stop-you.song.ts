import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDonTLetMeStopYou = {
  id: "019ea4ad-8d7b-7d23-84b5-baee8bd80db4",
  type: "page-type/song",
  slug: "kelly-clarkson-don-t-let-me-stop-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "366fa1cb-7b80-3ee1-81dc-709da0d4c32c",
      externalLink: "https://musicbrainz.org/work/366fa1cb-7b80-3ee1-81dc-709da0d4c32c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Let Me Stop You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
