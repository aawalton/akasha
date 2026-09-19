import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIfNoOneWillListen = {
  id: "019ea4b0-4b1f-71f2-ad95-318b7a09e84d",
  type: "page-type/song",
  slug: "kelly-clarkson-if-no-one-will-listen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d093caa6-6453-37db-8412-609d10b205b1",
      externalLink: "https://musicbrainz.org/work/d093caa6-6453-37db-8412-609d10b205b1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If No One Will Listen",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
