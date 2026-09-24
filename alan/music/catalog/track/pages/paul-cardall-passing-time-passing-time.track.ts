import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimePassingTime = {
  id: "01a0b4c8-6bc3-7e69-9e54-66df03f335f5",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-passing-time",
  ownLength: 3.978,
  ownProgress: 3.978,
  partOfCollections: ["release/paul-cardall-passing-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "Passing Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|238680",
  song: "song/paul-cardall-passing-time",
  carriedBy: [
    {
      release: "release/paul-cardall-passing-time",
      discNumber: 1,
      position: 1,
      externalId: "2PelR6ZEm4UK5cr4pZWiaz",
      externalLink: "https://open.spotify.com/track/2PelR6ZEm4UK5cr4pZWiaz",
    },
  ],
} as const satisfies Track
