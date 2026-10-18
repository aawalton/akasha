import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulSomeKindOfMiracle = {
  id: "01a14f45-0243-754a-a449-c211f41772cb",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-some-kind-of-miracle",
  ownLength: 3.63355,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Some Kind Of Miracle",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "somekindofmiracle|3BmGtnKgCSGYIUhmivXKWX|218013",
  song: "song/kelly-clarkson-some-kind-of-miracle",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 4,
      externalId: "4Wa0Znke8LABriGEDOfyuZ",
      externalLink: "https://open.spotify.com/track/4Wa0Znke8LABriGEDOfyuZ",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
