import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDressedInBlack = {
  id: "019ea4c3-e267-73a0-84d9-78fb42464e77",
  type: "page-type/song",
  slug: "sia-dressed-in-black",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5614edd6-52f8-4dfc-ae6b-7a4276c6a1eb",
      externalLink: "https://musicbrainz.org/work/5614edd6-52f8-4dfc-ae6b-7a4276c6a1eb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dressed in Black",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
