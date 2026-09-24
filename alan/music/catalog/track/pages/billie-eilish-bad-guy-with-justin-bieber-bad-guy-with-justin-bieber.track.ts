import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBadGuyWithJustinBieberBadGuyWithJustinBieber = {
  id: "01a0b638-ea33-7b13-b1a4-51e228a3458c",
  type: "page-type/track",
  slug: "billie-eilish-bad-guy-with-justin-bieber-bad-guy-with-justin-bieber",
  ownLength: 3.247316666666667,
  ownProgress: 3.247316666666667,
  partOfCollections: ["release/billie-eilish-bad-guy-with-justin-bieber"],
  status: "completed",
  unit: "unit/minutes",
  title: "bad guy (with Justin Bieber)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Justin Bieber" }],
  trackKey: "badguywithjustinbieber|1uNFoZAHBGtllmzznpCI3s,6qqNVTkY8uBg9cP3Jd7DAH|194839",
  song: "song/billie-eilish-bad-guy",
  carriedBy: [
    {
      release: "release/billie-eilish-bad-guy-with-justin-bieber",
      discNumber: 1,
      position: 1,
      externalId: "3yNZ5r3LKfdmjoS3gkhUCT",
      externalLink: "https://open.spotify.com/track/3yNZ5r3LKfdmjoS3gkhUCT",
    },
  ],
} as const satisfies Track
