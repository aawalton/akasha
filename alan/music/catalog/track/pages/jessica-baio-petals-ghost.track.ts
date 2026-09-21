import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioPetalsGhost = {
  id: "01a0c622-210a-7939-b3b9-548bffad8ffb",
  type: "page-type/track",
  slug: "jessica-baio-petals-ghost",
  ownLength: 2.1552166666666666,
  ownProgress: 2.1552166666666666,
  partOfCollections: [
    "release/jessica-baio-petals",
    "release/jessica-baio-bad-tattoo",
    "release/jessica-baio-ghost",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "ghost",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "ghost|0VMFTqmv0hYlWruyBERT95|129313",
  song: "song/jessica-baio-ghost",
  carriedBy: [
    {
      release: "release/jessica-baio-bad-tattoo",
      discNumber: 1,
      position: 2,
      externalId: "3SMYMUpzQWrRJn34eCPROl",
      externalLink: "https://open.spotify.com/track/3SMYMUpzQWrRJn34eCPROl",
    },
    {
      release: "release/jessica-baio-ghost",
      discNumber: 1,
      position: 1,
      externalId: "0GcLkedOfpccI5VpIHhWUx",
      externalLink: "https://open.spotify.com/track/0GcLkedOfpccI5VpIHhWUx",
    },
    {
      release: "release/jessica-baio-petals",
      discNumber: 1,
      position: 5,
      externalId: "42FEkYjB7tdsWvyvvy3Mrz",
      externalLink: "https://open.spotify.com/track/42FEkYjB7tdsWvyvvy3Mrz",
    },
  ],
} as const satisfies Track
