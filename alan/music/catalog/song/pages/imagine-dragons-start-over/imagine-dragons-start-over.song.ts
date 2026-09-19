import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsStartOver = {
  id: "019ea49b-f6e0-71fa-bf29-45c541a1964d",
  type: "page-type/song",
  slug: "imagine-dragons-start-over",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4362d98e-4fee-4d9f-99ec-0589367632e3",
      externalLink: "https://musicbrainz.org/work/4362d98e-4fee-4d9f-99ec-0589367632e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Start Over",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
