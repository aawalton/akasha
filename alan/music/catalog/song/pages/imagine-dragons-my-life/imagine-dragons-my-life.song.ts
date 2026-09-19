import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMyLife = {
  id: "019ea49b-28d4-72bb-8f20-5f9ca9edbae9",
  type: "page-type/song",
  slug: "imagine-dragons-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f87fe0fb-8039-48a5-bc8e-d37e208b558c",
      externalLink: "https://musicbrainz.org/work/f87fe0fb-8039-48a5-bc8e-d37e208b558c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Life",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
