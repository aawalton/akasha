import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBrotherTrucker = {
  id: "01a0b72f-2714-7c95-bfaf-f051ac925b4f",
  type: "page-type/song",
  slug: "james-taylor-brother-trucker",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7166dce0-81b4-3eed-8bdc-e44a09ae88a4",
      externalLink: "https://musicbrainz.org/work/7166dce0-81b4-3eed-8bdc-e44a09ae88a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brother Trucker",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:01:55.860Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
