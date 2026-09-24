import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9LivesRabbithole = {
  id: "01a0c43e-7930-7b1b-ab84-2bdbf35df065",
  type: "page-type/track",
  slug: "emei-9-lives-rabbithole",
  ownLength: 2.3573833333333334,
  ownProgress: 2.3573833333333334,
  partOfCollections: [
    "release/emei-9-lives",
    "release/emei-all-these-kids",
    "release/emei-rabbithole-2",
    "release/emei-rabbithole",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "RABBITHOLE",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "rabbithole|7E2aQQjErJocovYFjYLzWU|141443",
  song: "song/emei-rabbithole",
  carriedBy: [
    {
      release: "release/emei-9-lives",
      discNumber: 1,
      position: 3,
      externalId: "4vRtKITmMuwPYckPVaoXwG",
      externalLink: "https://open.spotify.com/track/4vRtKITmMuwPYckPVaoXwG",
    },
    {
      release: "release/emei-all-these-kids",
      discNumber: 1,
      position: 2,
      externalId: "0onhIULeudqAHzp2MSPWc4",
      externalLink: "https://open.spotify.com/track/0onhIULeudqAHzp2MSPWc4",
    },
    {
      release: "release/emei-rabbithole",
      discNumber: 1,
      position: 1,
      externalId: "5NVnK2Ct25u1enmwdWAdkR",
      externalLink: "https://open.spotify.com/track/5NVnK2Ct25u1enmwdWAdkR",
    },
    {
      release: "release/emei-rabbithole-2",
      discNumber: 1,
      position: 1,
      externalId: "5zYt0cbXQ6ukX3Oc8Wed4m",
      externalLink: "https://open.spotify.com/track/5zYt0cbXQ6ukX3Oc8Wed4m",
    },
  ],
} as const satisfies Track
