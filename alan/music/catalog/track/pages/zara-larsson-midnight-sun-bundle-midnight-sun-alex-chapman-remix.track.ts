import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunBundleMidnightSunAlexChapmanRemix = {
  id: "01a0aa7c-3751-7570-8d87-dccba8e70e0e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-bundle-midnight-sun-alex-chapman-remix",
  ownLength: 3.22905,
  ownProgress: 3.22905,
  partOfCollections: ["release/zara-larsson-midnight-sun-bundle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight Sun - Alex Chapman Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Alex Chapman" }],
  trackKey: "midnightsunalexchapmanremix|1Xylc3o4UrD53lo9CvFvVg,3c8wfedCs5BJGHcFyusyeh|193743",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-bundle",
      discNumber: 1,
      position: 2,
      externalId: "1LFBygPkUZyFE0U7hJDWOb",
      externalLink: "https://open.spotify.com/track/1LFBygPkUZyFE0U7hJDWOb",
    },
  ],
} as const satisfies Track
