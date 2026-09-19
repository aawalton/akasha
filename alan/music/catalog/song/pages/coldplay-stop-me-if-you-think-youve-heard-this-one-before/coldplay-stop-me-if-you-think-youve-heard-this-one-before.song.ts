import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayStopMeIfYouThinkYouveHeardThisOneBefore = {
  id: "01a0ba5d-5377-7d2e-9974-f212337bc556",
  type: "page-type/song",
  slug: "coldplay-stop-me-if-you-think-youve-heard-this-one-before",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7b2386af-fb27-3f82-aaa1-52b677dfb889",
      externalLink: "https://musicbrainz.org/work/7b2386af-fb27-3f82-aaa1-52b677dfb889",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stop Me If You Think You’ve Heard This One Before",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
