import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBeforeYourLove = {
  id: "019ea4ad-a5c4-7aba-ab66-fba674366279",
  type: "page-type/song",
  slug: "kelly-clarkson-before-your-love",
  title: "Before Your Love",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3aad7de1-9250-4860-8c3b-bd1cfdb5bf59",
      externalLink: "https://musicbrainz.org/work/3aad7de1-9250-4860-8c3b-bd1cfdb5bf59",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
