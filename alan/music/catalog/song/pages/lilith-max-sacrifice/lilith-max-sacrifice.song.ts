import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSacrifice = {
  id: "019ea4f6-31c9-7738-8445-f5702f9754ce",
  type: "page-type/song",
  slug: "lilith-max-sacrifice",
  title: "Sacrifice",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0f83b330-5e1a-436e-a70a-30464cd28f7c",
      externalLink: "https://musicbrainz.org/recording/0f83b330-5e1a-436e-a70a-30464cd28f7c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
