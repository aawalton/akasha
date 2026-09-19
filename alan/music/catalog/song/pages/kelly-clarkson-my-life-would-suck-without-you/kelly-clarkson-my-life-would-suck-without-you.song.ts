import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMyLifeWouldSuckWithoutYou = {
  id: "019ea4ad-b538-7a5c-953b-e4add41c1c5d",
  type: "page-type/song",
  slug: "kelly-clarkson-my-life-would-suck-without-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3da16acc-cc19-3e2d-8896-d1d4041867b9",
      externalLink: "https://musicbrainz.org/work/3da16acc-cc19-3e2d-8896-d1d4041867b9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Life Would Suck Without You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
