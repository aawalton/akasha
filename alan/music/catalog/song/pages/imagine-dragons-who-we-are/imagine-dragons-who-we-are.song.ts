import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWhoWeAre = {
  id: "019ea49c-c134-775f-9075-cf924f022594",
  type: "page-type/song",
  slug: "imagine-dragons-who-we-are",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d12e41e2-30d3-4634-b91f-719aaac98fe1",
      externalLink: "https://musicbrainz.org/work/d12e41e2-30d3-4634-b91f-719aaac98fe1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Who We Are",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
