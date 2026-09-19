import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSharks = {
  id: "019ea49b-66a2-7965-a0f7-f641c1834278",
  type: "page-type/song",
  slug: "imagine-dragons-sharks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0ab26e65-762a-4eb9-ad1b-98c1966a3845",
      externalLink: "https://musicbrainz.org/work/0ab26e65-762a-4eb9-ad1b-98c1966a3845",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sharks",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
