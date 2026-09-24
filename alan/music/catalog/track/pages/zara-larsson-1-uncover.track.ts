import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Uncover = {
  id: "01a0aa7c-35b4-7787-8ad4-c1a21ed813e8",
  type: "page-type/track",
  slug: "zara-larsson-1-uncover",
  ownLength: 3.5763833333333332,
  ownProgress: 3.5763833333333332,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Uncover",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "uncover|1Xylc3o4UrD53lo9CvFvVg|214583",
  song: "song/zara-larsson-uncover",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 12,
      externalId: "1aAR4ew6wViXZJofgVo94M",
      externalLink: "https://open.spotify.com/track/1aAR4ew6wViXZJofgVo94M",
    },
  ],
} as const satisfies Track
