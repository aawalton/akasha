import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCantGetYouOutOfMyHead = {
  id: "01a0ba5d-38fc-73de-9f31-016e4604dd27",
  type: "page-type/song",
  slug: "coldplay-cant-get-you-out-of-my-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "10b14617-6ba7-35c3-851d-5af3b3d7b6ad",
      externalLink: "https://musicbrainz.org/work/10b14617-6ba7-35c3-851d-5af3b3d7b6ad",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Can’t Get You Out of My Head",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
