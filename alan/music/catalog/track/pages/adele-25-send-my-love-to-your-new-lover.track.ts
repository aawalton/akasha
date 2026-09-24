import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25SendMyLoveToYourNewLover = {
  id: "01a0d52b-c25a-73a2-91c1-9121d4aa976f",
  type: "page-type/track",
  slug: "adele-25-send-my-love-to-your-new-lover",
  ownLength: 3.717966666666667,
  ownProgress: 3.717966666666667,
  partOfCollections: ["release/adele-25", "release/adele-send-my-love-to-your-new-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "Send My Love (To Your New Lover)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "sendmylovetoyournewlover|4dpARuHxo51G3z768sgnrY|223078",
  song: "song/adele-send-my-love-to-your-new-lover",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 2,
      externalId: "0t7fVeEJxO2Xi4H2K5Svc9",
      externalLink: "https://open.spotify.com/track/0t7fVeEJxO2Xi4H2K5Svc9",
    },
    {
      release: "release/adele-send-my-love-to-your-new-lover",
      discNumber: 1,
      position: 1,
      externalId: "5GltPAIcCUULOIAglW6R4l",
      externalLink: "https://open.spotify.com/track/5GltPAIcCUULOIAglW6R4l",
    },
  ],
} as const satisfies Track
