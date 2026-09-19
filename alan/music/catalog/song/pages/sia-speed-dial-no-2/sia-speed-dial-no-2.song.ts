import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSpeedDialNo2 = {
  id: "019ea4cb-8255-7587-a5f3-094394a1d057",
  type: "page-type/song",
  slug: "sia-speed-dial-no-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b1c390a-6c7f-4f93-9758-092fc08a0ecb",
      externalLink: "https://musicbrainz.org/work/2b1c390a-6c7f-4f93-9758-092fc08a0ecb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speed Dial No 2",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
