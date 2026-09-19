import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSoldiers = {
  id: "01a0b72f-4f47-7911-84cf-bce969774985",
  type: "page-type/song",
  slug: "james-taylor-soldiers",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83640de6-9c4b-442a-af59-60ec88f91151",
      externalLink: "https://musicbrainz.org/work/83640de6-9c4b-442a-af59-60ec88f91151",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soldiers",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
