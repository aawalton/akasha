import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderTheRemixesSixFeetUnderGazzoRemix = {
  id: "01a0b638-ed71-7a9c-b0fa-a76979db4061",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-the-remixes-six-feet-under-gazzo-remix",
  ownLength: 3.466666666666667,
  ownProgress: 3.466666666666667,
  partOfCollections: ["release/billie-eilish-six-feet-under-the-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Six Feet Under - Gazzo Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Gazzo" }],
  trackKey: "sixfeetundergazzoremix|5st4KKihmnSMLRsxWOs2x3,6qqNVTkY8uBg9cP3Jd7DAH|208000",
  song: "song/billie-eilish-six-feet-under",
  carriedBy: [
    {
      release: "release/billie-eilish-six-feet-under-the-remixes",
      discNumber: 1,
      position: 2,
      externalId: "3UHa28GclZhNqqlaNFzKKY",
      externalLink: "https://open.spotify.com/track/3UHa28GclZhNqqlaNFzKKY",
    },
  ],
} as const satisfies Track
