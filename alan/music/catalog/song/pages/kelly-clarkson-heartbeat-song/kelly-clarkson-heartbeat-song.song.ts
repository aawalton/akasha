import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHeartbeatSong = {
  id: "019ea4b0-98be-722f-bb57-e70d60e988d1",
  type: "page-type/song",
  slug: "kelly-clarkson-heartbeat-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d7e2dac9-57b6-4561-9698-670fc54bc4c1",
      externalLink: "https://musicbrainz.org/work/d7e2dac9-57b6-4561-9698-670fc54bc4c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heartbeat Song",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
