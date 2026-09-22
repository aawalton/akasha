import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWinterWonderland = {
  id: "01a0b72f-4829-733f-bd04-13ff838db182",
  type: "page-type/song",
  slug: "james-taylor-winter-wonderland",
  partOfCollections: ["artist/the-piano-guys"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "272df053-1800-46bf-b180-08df4173e58f",
      externalLink: "https://musicbrainz.org/work/272df053-1800-46bf-b180-08df4173e58f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Wonderland",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
