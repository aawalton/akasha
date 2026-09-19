import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTwoStepsBehind = {
  id: "019ea416-4b76-7644-9d58-0fde6820ecaf",
  type: "page-type/song",
  slug: "taylor-swift-two-steps-behind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "daf6e75b-b440-334c-99fb-b0af4fb08dd2",
      externalLink: "https://musicbrainz.org/work/daf6e75b-b440-334c-99fb-b0af4fb08dd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Two Steps Behind",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
