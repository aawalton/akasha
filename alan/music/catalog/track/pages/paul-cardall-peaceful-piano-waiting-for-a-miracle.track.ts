import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWaitingForAMiracle = {
  id: "01a0b4c8-3225-7954-9739-da6429b2629d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-waiting-for-a-miracle",
  ownLength: 3.5973333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0O40EaaeL2hNMyX6U7L58N",
      externalLink: "https://open.spotify.com/track/0O40EaaeL2hNMyX6U7L58N",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Waiting for a Miracle",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "waitingforamiracle|7FQRbf8gbKw8KZQZAJWxH2|215840",
} as const satisfies Track
