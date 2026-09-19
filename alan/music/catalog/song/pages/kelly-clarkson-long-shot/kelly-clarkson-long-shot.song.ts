import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLongShot = {
  id: "019ea4ae-a447-7604-8754-59e7ea4e5d78",
  type: "page-type/song",
  slug: "kelly-clarkson-long-shot",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "628fe463-dbcb-300b-b6e2-cb3a00b9da5c",
      externalLink: "https://musicbrainz.org/work/628fe463-dbcb-300b-b6e2-cb3a00b9da5c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Long Shot",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
