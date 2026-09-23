import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LavenderHazeRemixesLavenderHazeSnakehipsRemix = {
  id: "01a0ce86-9bd1-7a30-b22a-040eff8e1cc4",
  type: "page-type/track",
  slug: "taylor-swift-2-lavender-haze-remixes-lavender-haze-snakehips-remix",
  ownLength: 3.125166666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lavender-haze-remixes"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lavender Haze - Snakehips Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "2FwJwEswyIUAljqgjNSHgP", artistName: "Snakehips" },
  ],
  trackKey: "lavenderhazesnakehipsremix|06HL4z0CvFAxyc27GXpf02,2FwJwEswyIUAljqgjNSHgP|187510",
  song: "song/taylor-swift-lavender-haze",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lavender-haze-remixes",
      discNumber: 1,
      position: 2,
      externalId: "6F67FNdOBNMFzxdj1CQ5pL",
      externalLink: "https://open.spotify.com/track/6F67FNdOBNMFzxdj1CQ5pL",
    },
  ],
} as const satisfies Track
