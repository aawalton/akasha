import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonOHolyNight = {
  id: "019ea4b1-f17c-73e2-b591-1653dd2e3289",
  type: "page-type/song",
  slug: "kelly-clarkson-o-holy-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bf57c435-6ce0-3d57-ab04-e2a9179b178c",
      externalLink: "https://musicbrainz.org/work/bf57c435-6ce0-3d57-ab04-e2a9179b178c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Holy Night",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
