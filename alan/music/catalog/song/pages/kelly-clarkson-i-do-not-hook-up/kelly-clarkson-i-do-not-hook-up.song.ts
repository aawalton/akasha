import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIDoNotHookUp = {
  id: "019ea4ad-3c8b-72d3-905d-9666ee461fd3",
  type: "page-type/song",
  slug: "kelly-clarkson-i-do-not-hook-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f8d389c-3498-355d-a1b4-cb5ba07b52e4",
      externalLink: "https://musicbrainz.org/work/1f8d389c-3498-355d-a1b4-cb5ba07b52e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Do Not Hook Up",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
