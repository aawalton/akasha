import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAdore = {
  id: "019ea4e1-8ec4-7d87-945e-914ad58f57de",
  type: "page-type/song",
  slug: "ariana-grande-adore",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "664f655a-0eb9-45ea-a7bc-65f704c97a8f",
      externalLink: "https://musicbrainz.org/work/664f655a-0eb9-45ea-a7bc-65f704c97a8f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Adore",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
