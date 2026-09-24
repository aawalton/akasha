import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2FatherInHeaven = {
  id: "01a0b4c8-5f9f-72ca-b830-f371d9702f4c",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-father-in-heaven",
  ownLength: 3.548,
  ownProgress: 3.548,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Father in Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "fatherinheaven|7FQRbf8gbKw8KZQZAJWxH2|212880",
  song: "song/paul-cardall-father-in-heaven",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns-vol-2",
      discNumber: 1,
      position: 10,
      externalId: "7pEspvJQyPRyAnnUwCMeM0",
      externalLink: "https://open.spotify.com/track/7pEspvJQyPRyAnnUwCMeM0",
    },
  ],
} as const satisfies Track
