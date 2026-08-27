import type { PidSnapshot } from "./memory-monitor/shared"

export interface RecordedProc {
  readonly pid: number
  readonly rssKb: number
  readonly name: string
  readonly argv0: string
}

export interface RecordedTreeKill {
  readonly at: string
  readonly ownerName: string | null
  readonly rootPid: number
  readonly treeSize: number
  readonly totalRssKb: number
  readonly procs: readonly RecordedProc[]
}

type ProcTuple = readonly [pid: number, rssKb: number, name: string, argv0: string]

const RECORDS: readonly {
  at: string
  ownerName: string | null
  rootPid: number
  treeSize: number
  totalRssKb: number
  procs: readonly ProcTuple[]
}[] = [
  {
    at: "2026-07-26T22:35:39Z",
    ownerName: null,
    rootPid: 11034,
    treeSize: 11,
    totalRssKb: 26004304,
    procs: [
      [11034, 48664, "bun", "bun"],
      [11058, 114936, "bun", "/var/home/walton/.bun/bin/bun"],
      [711699, 646524, "claude", "claude"],
      [4187290, 3532, "bash", "/bin/bash"],
      [4187369, 2120, "head", "head"],
      [4187368, 2096, "bash", "/bin/bash"],
      [4187372, 24903716, "2.1.219", "ugrep"],
      [711770, 55588, "npm exec @playw", "[UNCLASSIFIED]"],
      [712170, 51376, "node", "node"],
      [711768, 52884, "bun", "bun"],
      [11112, 122868, "bun", "bun"],
    ],
  },
  {
    at: "2026-07-26T06:27:48Z",
    ownerName: "project-16371",
    rootPid: 3110856,
    treeSize: 17,
    totalRssKb: 25549108,
    procs: [
      [3110856, 46252, "bun", "/home/walton/.bun/bin/bun"],
      [3110869, 104844, "bun", "bun"],
      [3111362, 469736, "claude", "claude"],
      [4022087, 4036, "bash", "/bin/bash"],
      [4022119, 2236, "sleep", "sleep"],
      [3988753, 4040, "bash", "/bin/bash"],
      [3988788, 2164, "cut", "cut"],
      [3988787, 2556, "bash", "/bin/bash"],
      [3988790, 6792, "2.1.219", "ugrep"],
      [3988786, 2556, "bash", "/bin/bash"],
      [3988789, 6812, "2.1.219", "ugrep"],
      [3988785, 2560, "bash", "/bin/bash"],
      [3988791, 24616948, "2.1.219", "ugrep"],
      [3111425, 57052, "npm exec @playw", "[UNCLASSIFIED]"],
      [3112271, 49104, "node", "node"],
      [3111423, 73152, "bun", "bun"],
      [3111096, 98268, "bun", "bun"],
    ],
  },
  {
    at: "2026-07-25T15:47:55Z",
    ownerName: null,
    rootPid: 3177791,
    treeSize: 35,
    totalRssKb: 26423520,
    procs: [
      [3177791, 49236, "bun", "bun"],
      [3177828, 309532, "bun", "/var/home/walton/.bun/bin/bun"],
      [3178750, 535360, "claude", "claude"],
      [3178830, 29040, "npm exec @playw", "[UNCLASSIFIED]"],
      [3180131, 64284, "node", "node"],
      [
        308834,
        179948,
        "chrome",
        "/home/walton/.cache/ms-playwright/chromium-1226/chrome-linux64/chrome",
      ],
      [308873, 111548, "chrome", "[UNCLASSIFIED]"],
      [308849, 59128, "chrome", "[UNCLASSIFIED]"],
      [414632, 59064, "chrome", "[UNCLASSIFIED]"],
      [332695, 114288, "chrome", "[UNCLASSIFIED]"],
      [308905, 43060, "chrome", "[UNCLASSIFIED]"],
      [308848, 56132, "chrome", "[UNCLASSIFIED]"],
      [308870, 99660, "chrome", "[UNCLASSIFIED]"],
      [3178819, 55912, "bun", "bun"],
      [415081, 4048, "bash", "/bin/bash"],
      [415201, 11352, "python3", "python3"],
      [415200, 14840, "curl", "curl"],
      [412498, 4108, "bash", "/bin/bash"],
      [414407, 11184, "python3", "python3"],
      [410409, 4096, "bash", "/bin/bash"],
      [414829, 2308, "sleep", "sleep"],
      [396391, 4052, "bash", "/bin/bash"],
      [413223, 2308, "sleep", "sleep"],
      [362336, 3980, "bash", "/bin/bash"],
      [362374, 2292, "head", "head"],
      [362373, 2536, "bash", "/bin/bash"],
      [362375, 9504456, "2.1.219", "ugrep"],
      [360819, 4120, "bash", "/bin/bash"],
      [403475, 2232, "sleep", "sleep"],
      [213483, 3416, "bash", "/bin/bash"],
      [213535, 2108, "head", "head"],
      [213533, 2216, "sort", "sort"],
      [213532, 2036, "bash", "/bin/bash"],
      [213536, 14962428, "2.1.219", "ugrep"],
      [3178137, 107212, "bun", "bun"],
    ],
  },
  {
    at: "2026-07-25T14:28:09Z",
    ownerName: "rename-batch-a",
    rootPid: 1249145,
    treeSize: 10,
    totalRssKb: 25655380,
    procs: [
      [1249145, 47436, "bun", "/home/walton/.bun/bin/bun"],
      [1249222, 94868, "bun", "bun"],
      [1249781, 464008, "claude", "claude"],
      [1629121, 3608, "bash", "/bin/bash"],
      [1629172, 2176, "bash", "/bin/bash"],
      [1629174, 24765980, "2.1.219", "ugrep"],
      [1250118, 56660, "npm exec @playw", "[UNCLASSIFIED]"],
      [1251676, 48028, "node", "node"],
      [1250096, 72560, "bun", "bun"],
      [1249494, 100056, "bun", "bun"],
    ],
  },
]

export const recordedTreeKills: readonly RecordedTreeKill[] = RECORDS.map((r) => ({
  at: r.at,
  ownerName: r.ownerName,
  rootPid: r.rootPid,
  treeSize: r.treeSize,
  totalRssKb: r.totalRssKb,
  procs: r.procs.map(([pid, rssKb, name, argv0]) => ({ pid, rssKb, name, argv0 })),
}))

export function snapshotsFromRecord(record: RecordedTreeKill): readonly PidSnapshot[] {
  return record.procs.map((p) => ({
    pid: p.pid,
    ppid: p.pid === record.rootPid ? 1 : record.rootPid,
    vmRssKb: p.rssKb,
    name: p.name,
  }))
}
