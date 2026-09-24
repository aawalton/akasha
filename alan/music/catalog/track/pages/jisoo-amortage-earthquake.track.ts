import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageEarthquake = {
  id: "01a0afa2-731a-7126-a55f-4d9061a2ec68",
  type: "page-type/track",
  slug: "jisoo-amortage-earthquake",
  ownLength: 3.1801,
  ownProgress: 3.1801,
  partOfCollections: ["release/jisoo-amortage"],
  status: "completed",
  unit: "unit/minutes",
  title: "earthquake",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "earthquake|6UZ0ba50XreR4TM8u322gs|190806",
  song: "song/jisoo-earthquake",
  carriedBy: [
    {
      release: "release/jisoo-amortage",
      discNumber: 1,
      position: 1,
      externalId: "10zywlg5b0gQOC3q1A7ADx",
      externalLink: "https://open.spotify.com/track/10zywlg5b0gQOC3q1A7ADx",
    },
  ],
} as const satisfies Track
