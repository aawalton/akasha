import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTieItUp = {
  id: "019ea4c1-7fef-7ded-8a8b-5ec3229c2c1e",
  type: "page-type/song",
  slug: "kelly-clarkson-tie-it-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e08284df-a4bb-4087-8567-2e4bf4c2401c",
      externalLink: "https://musicbrainz.org/work/e08284df-a4bb-4087-8567-2e4bf4c2401c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tie It Up",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
