import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxStrangerSEyes = {
  id: "019ea4f6-65b9-7a1c-9a9c-1556977950d7",
  type: "page-type/song",
  slug: "lilith-max-stranger-s-eyes",
  title: "Stranger's Eyes",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc515c35-cfff-492e-ac58-060a02b7307a",
      externalLink: "https://musicbrainz.org/recording/cc515c35-cfff-492e-ac58-060a02b7307a",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
