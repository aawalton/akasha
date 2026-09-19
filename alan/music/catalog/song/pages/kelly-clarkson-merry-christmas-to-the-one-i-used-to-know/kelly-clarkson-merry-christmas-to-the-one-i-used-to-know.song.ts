import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMerryChristmasToTheOneIUsedToKnow = {
  id: "019ea4b0-e47d-7774-88b5-ce89e8f7632b",
  type: "page-type/song",
  slug: "kelly-clarkson-merry-christmas-to-the-one-i-used-to-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f08f698f-3d38-40d3-acb2-ab8d1d286f4e",
      externalLink: "https://musicbrainz.org/work/f08f698f-3d38-40d3-acb2-ab8d1d286f4e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Merry Christmas (to the One I Used to Know)",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
