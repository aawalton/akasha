import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHappierThanEver = {
  id: "019ea4aa-e95d-7446-9457-2ab561c8d01d",
  type: "page-type/song",
  slug: "kelly-clarkson-happier-than-ever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aab769d3-a157-427d-b6b0-ac8120efce4d",
      externalLink: "https://musicbrainz.org/work/aab769d3-a157-427d-b6b0-ac8120efce4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Happier Than Ever",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
