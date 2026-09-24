import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoWaitingForAMiracle = {
  id: "01a0b4c8-3225-7954-9739-da6429b2629d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-waiting-for-a-miracle",
  ownLength: 3.5973333333333333,
  ownProgress: 3.5973333333333333,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Waiting for a Miracle",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "waitingforamiracle|7FQRbf8gbKw8KZQZAJWxH2|215840",
  song: "song/paul-cardall-waiting-for-a-miracle",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 7,
      externalId: "0O40EaaeL2hNMyX6U7L58N",
      externalLink: "https://open.spotify.com/track/0O40EaaeL2hNMyX6U7L58N",
    },
  ],
} as const satisfies Track
