import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonAmmunition = {
  id: "019ea49f-c82e-745f-b085-348fbe18d5a9",
  type: "page-type/song",
  slug: "zara-larsson-ammunition",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5ef3692b-96c9-4a12-8bee-6c72fec56f18",
      externalLink: "https://musicbrainz.org/work/5ef3692b-96c9-4a12-8bee-6c72fec56f18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ammunition",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
