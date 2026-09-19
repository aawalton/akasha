import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGimmeLove = {
  id: "019ea4c8-bc3c-70da-a116-44fe9937025d",
  type: "page-type/song",
  slug: "sia-gimme-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ec2761d-1daf-4f78-a5ae-97c44ca41bf9",
      externalLink: "https://musicbrainz.org/work/7ec2761d-1daf-4f78-a5ae-97c44ca41bf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gimme Love",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
