import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonJingleBellRock = {
  id: "019ea4af-888e-75db-8cb4-e8ed200601c2",
  type: "page-type/song",
  slug: "kelly-clarkson-jingle-bell-rock",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ab3c6a7-e71a-3445-a74e-c52b2f3be283",
      externalLink: "https://musicbrainz.org/work/9ab3c6a7-e71a-3445-a74e-c52b2f3be283",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jingle Bell Rock",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
