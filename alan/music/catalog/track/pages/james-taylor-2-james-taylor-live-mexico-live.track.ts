import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveMexicoLive = {
  id: "01a0abeb-3cb2-7698-97e7-e6b91108358c",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-mexico-live",
  ownLength: 3.2622166666666668,
  ownProgress: 3.2622166666666668,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mexico - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "mexicolive|0vn7UBvSQECKJm2817Yf1P|195733",
  song: "song/james-taylor-mexico",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 9,
      externalId: "497tjyC7zWeUrU5kk193oK",
      externalLink: "https://open.spotify.com/track/497tjyC7zWeUrU5kk193oK",
    },
  ],
} as const satisfies Track
