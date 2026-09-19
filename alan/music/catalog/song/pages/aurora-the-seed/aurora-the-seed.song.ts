import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheSeed = {
  id: "019ea4a4-7255-734d-aef6-52b129ac0d11",
  type: "page-type/song",
  slug: "aurora-the-seed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "43f7f67b-3e08-4a98-a26e-2026b10d3fa0",
      externalLink: "https://musicbrainz.org/work/43f7f67b-3e08-4a98-a26e-2026b10d3fa0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Seed",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
