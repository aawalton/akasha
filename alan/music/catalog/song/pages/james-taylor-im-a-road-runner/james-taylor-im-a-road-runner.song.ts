import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorImARoadRunner = {
  id: "01a0b72f-2924-7ed0-be16-5b7e9804324c",
  type: "page-type/song",
  slug: "james-taylor-im-a-road-runner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a44ab6c-70a1-42ad-8afa-4bc1fea9d7ac",
      externalLink: "https://musicbrainz.org/work/8a44ab6c-70a1-42ad-8afa-4bc1fea9d7ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "(I’m a) Road Runner",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
