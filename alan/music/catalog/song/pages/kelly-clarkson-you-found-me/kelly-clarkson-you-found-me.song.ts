import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonYouFoundMe = {
  id: "019ea4c1-3cd5-7705-a8d5-0ab9266d7174",
  type: "page-type/song",
  slug: "kelly-clarkson-you-found-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af585333-04de-38b2-95f6-f1276a89f931",
      externalLink: "https://musicbrainz.org/work/af585333-04de-38b2-95f6-f1276a89f931",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Found Me",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
