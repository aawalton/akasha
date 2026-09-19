import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMeanOldMan = {
  id: "01a0b72f-3e1d-7373-8276-918ce429cd6a",
  type: "page-type/song",
  slug: "james-taylor-mean-old-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b48f493b-78f4-33e2-bbc2-7c361acadb20",
      externalLink: "https://musicbrainz.org/work/b48f493b-78f4-33e2-bbc2-7c361acadb20",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mean Old Man",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
