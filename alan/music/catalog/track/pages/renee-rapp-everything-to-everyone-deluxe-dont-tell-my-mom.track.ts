import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeDontTellMyMom = {
  id: "01a0caa9-10c5-75c7-9dd2-175ab35c73c5",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-dont-tell-my-mom",
  ownLength: 3.1547833333333335,
  ownProgress: 3.1547833333333335,
  partOfCollections: [
    "release/renee-rapp-everything-to-everyone-deluxe",
    "release/renee-rapp-everything-to-everyone",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Tell My Mom",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/renee-rapp" }],
  trackKey: "donttellmymom|2hUYKu1x0UZQXvzCmggvSn|189287",
  song: "song/renee-rapp-dont-tell-my-mom",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone",
      discNumber: 1,
      position: 4,
      externalId: "1Ip2m42GTwiaG20hW7dtuZ",
      externalLink: "https://open.spotify.com/track/1Ip2m42GTwiaG20hW7dtuZ",
    },
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "4FecU7yEjhjDxeppbU6r0r",
      externalLink: "https://open.spotify.com/track/4FecU7yEjhjDxeppbU6r0r",
    },
  ],
} as const satisfies Track
