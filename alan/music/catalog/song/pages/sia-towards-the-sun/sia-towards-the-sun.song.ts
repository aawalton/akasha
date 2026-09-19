import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTowardsTheSun = {
  id: "019ea4cb-9f97-7670-b809-e97d82d477d0",
  type: "page-type/song",
  slug: "sia-towards-the-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2e886392-6968-4c66-9aca-a2b921f54698",
      externalLink: "https://musicbrainz.org/work/2e886392-6968-4c66-9aca-a2b921f54698",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Towards the Sun",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
