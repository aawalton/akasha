import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDonTForgetMe = {
  id: "019ea498-9556-78d3-a849-474547cb0d52",
  type: "page-type/song",
  slug: "imagine-dragons-don-t-forget-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "64f20f46-781b-4a0f-8882-f80759c38c8e",
      externalLink: "https://musicbrainz.org/work/64f20f46-781b-4a0f-8882-f80759c38c8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Forget Me",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
