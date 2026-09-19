import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WhenYouReGoneNeverGonnaGiveYouUp = {
  id: "01a0afa1-fdb5-762e-8f03-f7cd39abc836",
  type: "page-type/track",
  slug: "the-piano-guys-3-when-you-re-gone-never-gonna-give-you-up",
  ownLength: 3.04385,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-when-you-re-gone"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wqHcF6k472o8cQRcfWOXY",
      externalLink: "https://open.spotify.com/track/7wqHcF6k472o8cQRcfWOXY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Never Gonna Give You Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nevergonnagiveyouup|0jW6R8CVyVohuUJVcuweDI|182631",
  song: "song/the-piano-guys-never-gonna-give-you-up",
} as const satisfies Track
