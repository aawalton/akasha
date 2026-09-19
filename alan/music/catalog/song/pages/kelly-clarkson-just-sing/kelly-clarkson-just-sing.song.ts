import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonJustSing = {
  id: "019ea4af-ab71-7358-90e7-e148f77237f7",
  type: "page-type/song",
  slug: "kelly-clarkson-just-sing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa51122e-8c9a-433d-8e2b-fdd81439f6db",
      externalLink: "https://musicbrainz.org/work/aa51122e-8c9a-433d-8e2b-fdd81439f6db",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Just Sing",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
