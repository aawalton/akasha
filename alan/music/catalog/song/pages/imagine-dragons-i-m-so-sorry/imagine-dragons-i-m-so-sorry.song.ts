import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIMSoSorry = {
  id: "019ea49a-3f2b-7faf-ac90-d7b49d4f3335",
  type: "page-type/song",
  slug: "imagine-dragons-i-m-so-sorry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b823ad3a-d189-4041-aa09-35ef0bb1aae3",
      externalLink: "https://musicbrainz.org/work/b823ad3a-d189-4041-aa09-35ef0bb1aae3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m So Sorry",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:20:32.683Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
