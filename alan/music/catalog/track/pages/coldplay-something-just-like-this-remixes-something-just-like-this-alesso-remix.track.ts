import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySomethingJustLikeThisRemixesSomethingJustLikeThisAlessoRemix = {
  id: "01a0b9ee-f287-74d9-b65c-317f8aac9c00",
  type: "page-type/track",
  slug: "coldplay-something-just-like-this-remixes-something-just-like-this-alesso-remix",
  ownLength: 4.21555,
  ownProgress: 4.21555,
  partOfCollections: ["release/coldplay-something-just-like-this-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Something Just Like This - Alesso Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "The Chainsmokers" },
    { artist: "artist/coldplay" },
    { artistName: "Alesso" },
  ],
  trackKey:
    "somethingjustlikethisalessoremix|4AVFqumd2ogHFlRbKIjp1t,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp|252933",
  song: "song/coldplay-something-just-like-this",
  carriedBy: [
    {
      release: "release/coldplay-something-just-like-this-remixes",
      discNumber: 1,
      position: 1,
      externalId: "50RJdoxw8iajGNtHQe6QeS",
      externalLink: "https://open.spotify.com/track/50RJdoxw8iajGNtHQe6QeS",
    },
  ],
} as const satisfies Track
