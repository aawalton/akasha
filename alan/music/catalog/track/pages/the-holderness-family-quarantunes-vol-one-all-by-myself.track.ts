import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneAllByMyself = {
  id: "01a0b4c6-cc36-70cb-999f-917ce7b92e50",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-all-by-myself",
  ownLength: 2.4751,
  ownProgress: 2.4751,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  status: "completed",
  unit: "unit/minutes",
  title: "All by Myself",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "allbymyself|6tITG4T8LpC0msapZ4wXGA|148506",
  song: "song/the-holderness-family-all-by-myself",
  carriedBy: [
    {
      release: "release/the-holderness-family-quarantunes-vol-one",
      discNumber: 1,
      position: 13,
      externalId: "1zU5doSrryv6IDoQn61AiK",
      externalLink: "https://open.spotify.com/track/1zU5doSrryv6IDoQn61AiK",
    },
  ],
} as const satisfies Track
