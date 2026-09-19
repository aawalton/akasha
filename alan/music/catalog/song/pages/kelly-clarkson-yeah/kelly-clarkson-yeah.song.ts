import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonYeah = {
  id: "019ea4b1-8f29-7131-a01e-825d4ac8d26f",
  type: "page-type/song",
  slug: "kelly-clarkson-yeah",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1961ce1a-287d-4fef-9e44-d032e1111c73",
      externalLink: "https://musicbrainz.org/work/1961ce1a-287d-4fef-9e44-d032e1111c73",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yeah",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
