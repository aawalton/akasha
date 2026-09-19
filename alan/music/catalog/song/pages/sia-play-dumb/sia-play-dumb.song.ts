import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPlayDumb = {
  id: "019ea4ce-1b16-76bf-a312-7d97fdfb5448",
  type: "page-type/song",
  slug: "sia-play-dumb",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c67ac09c-2e93-4c5c-a599-9edb105a7857",
      externalLink: "https://musicbrainz.org/work/c67ac09c-2e93-4c5c-a599-9edb105a7857",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Play Dumb",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
