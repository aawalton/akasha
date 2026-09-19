import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBeforeYourLove = {
  id: "019ea4ad-a5c4-7aba-ab66-fba674366279",
  type: "page-type/song",
  slug: "kelly-clarkson-before-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90e947b5-1aaa-49cb-94a3-d0036995a388",
      externalLink: "https://musicbrainz.org/work/90e947b5-1aaa-49cb-94a3-d0036995a388",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Before Your Love",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
