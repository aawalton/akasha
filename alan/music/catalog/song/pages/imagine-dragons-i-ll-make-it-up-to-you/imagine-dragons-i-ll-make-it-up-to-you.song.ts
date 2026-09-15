import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsILlMakeItUpToYou = {
  id: "019ea499-a615-7d2e-99ea-15900836ddc3",
  type: "song",
  slug: "imagine-dragons-i-ll-make-it-up-to-you",
  title: "I’ll Make It Up to You",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9480f4de-ff56-4248-9366-eef3caeed7ad",
      externalLink: "https://musicbrainz.org/work/9480f4de-ff56-4248-9366-eef3caeed7ad",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
