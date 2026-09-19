import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSideToSide = {
  id: "019ea4e4-f029-7eb2-b61b-809371c45e35",
  type: "page-type/song",
  slug: "ariana-grande-side-to-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "465f790b-436f-4319-9200-219fbd832e97",
      externalLink: "https://musicbrainz.org/work/465f790b-436f-4319-9200-219fbd832e97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Side to Side",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
