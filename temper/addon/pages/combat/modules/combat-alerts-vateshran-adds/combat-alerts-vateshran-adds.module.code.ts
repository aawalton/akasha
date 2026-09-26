export interface VateshranGate {
  normal?: number
  bannermen?: number
  champion?: number
  normalName?: string
  bannermenName?: string
  championName?: string
  boss?: boolean
  brimstone?: boolean
}

export const GREEN = "Hunter's Grotto"
export const BLUE = "The Wounding"
export const RED = "The Brimstone Den"

export const ADDS: Record<string, Record<number, VateshranGate>> = {
  [GREEN]: {
    [1]: {
      normal: 4,
      bannermen: 3,
      champion: 2,
      normalName: "shalks",
      bannermenName: "spriggans",
      championName: "alits",
    },
    [2]: {
      normal: 5,
      bannermen: 1,
      champion: 1,
      normalName: "shalks/fetcherfly hives",
      bannermenName: "spriggan",
      championName: "blessed spriggan?",
    },
    [3]: {
      boss: true,
    },
    [4]: {
      normal: 5,
      bannermen: 3,
      champion: 0,
      normalName: "direwolves/cliff striders",
      bannermenName: "spriggans",
      championName: "",
    },
    [5]: {
      normal: 4,
      bannermen: 2,
      champion: 0,
      normalName: "cliff striders",
      bannermenName: "terror birds",
      championName: "",
    },
    [6]: {
      boss: true,
    },
  },
  [BLUE]: {
    [1]: {
      normal: 4,
      bannermen: 3,
      champion: 0,
      normalName: "banekin",
      bannermenName: "twilights",
      championName: "",
    },
    [2]: {
      normal: 5,
      bannermen: 3,
      champion: 2,
    },
    [3]: {
      boss: true,
    },
    [4]: {
      normal: 5,
      bannermen: 2,
      champion: 0,
      normalName: "banekin",
      bannermenName: "watchers",
      championName: "",
    },
    [5]: {
      normal: 5,
      bannermen: 1,
      champion: 3,
      normalName: "banekin",
      bannermenName: "twilight",
      championName: "xivkyn/sentinel",
    },
    [6]: {
      normal: 2,
      bannermen: 1,
      champion: 3,
      normalName: "banekin",
      bannermenName: "watcher",
      championName: "xivkyn/sentinel/dire warden",
    },
    [7]: {
      normal: 9,
      bannermen: 0,
      champion: 1,
      normalName: "banekin",
      bannermenName: "",
      championName: "sentinel",
    },
    [8]: {
      normal: 4,
      bannermen: 0,
      champion: 2,
      normalName: "banekin",
      bannermenName: "",
      championName: "sentinel/xivkyn",
    },
    [9]: {
      boss: true,
    },
  },
  [RED]: {
    [1]: {
      normal: 5,
      bannermen: 5,
      champion: 0,
      normalName: "scamps",
      bannermenName: "clannfears/flame atros",
      championName: "",
    },
    [2]: {
      normal: 3,
      bannermen: 3,
      champion: 0,
      normalName: "scamps",
      bannermenName: "clannfears/flame atros",
      championName: "",
    },
    [3]: {
      boss: true,
    },
    [4]: {
      normal: 5,
      bannermen: 1,
      champion: 0,
      normalName: "scamps",
      bannermenName: "flame atros",
      championName: "",
    },
    [5]: {
      brimstone: true,
    },
    [6]: {
      normal: 3,
      bannermen: 5,
      champion: 1,
      normalName: "scamps",
      bannermenName: "dremora/flame atros",
      championName: "colossus",
    },
    [7]: {
      boss: true,
    },
  },
}
