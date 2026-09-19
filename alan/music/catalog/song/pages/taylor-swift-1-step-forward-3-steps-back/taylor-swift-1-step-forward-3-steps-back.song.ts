import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwift1StepForward3StepsBack = {
  id: "019ea416-14a1-7a6e-b974-25b2c6537ea6",
  type: "page-type/song",
  slug: "taylor-swift-1-step-forward-3-steps-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5c83faa-c316-411e-b8a3-fb4ae0ff55af",
      externalLink: "https://musicbrainz.org/work/c5c83faa-c316-411e-b8a3-fb4ae0ff55af",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1 step forward, 3 steps back",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
} as const satisfies Song
