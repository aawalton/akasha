export type Runner = {
  readonly valued: readonly string[]
  readonly asking: readonly string[]
  readonly numbered: number
}

const PLAIN: Runner = { valued: [], asking: [], numbered: 0 }

export const RUNNING_ANOTHER: ReadonlyMap<string, Runner> = new Map<string, Runner>([
  ["sudo", { valued: ["-u", "-g", "-p", "-C"], asking: ["-v", "-V", "-l"], numbered: 0 }],
  ["doas", { valued: ["-u", "-C"], asking: ["-L"], numbered: 0 }],
  [
    "env",
    {
      valued: ["-u", "--unset", "-C", "--chdir", "-S", "--split-string"],
      asking: [],
      numbered: 0,
    },
  ],
  ["command", { valued: [], asking: ["-v", "-V"], numbered: 0 }],
  ["exec", { valued: ["-a"], asking: [], numbered: 0 }],
  ["nohup", PLAIN],
  ["setsid", PLAIN],
  ["unbuffer", PLAIN],
  ["nice", { valued: ["-n", "--adjustment"], asking: [], numbered: 0 }],
  [
    "ionice",
    {
      valued: ["-c", "--class", "-n", "--classdata", "-p", "--pid", "-P", "--pgid", "-u", "--uid"],
      asking: [],
      numbered: 0,
    },
  ],
  ["chrt", { valued: ["-p", "--pid"], asking: [], numbered: 1 }],
  ["taskset", { valued: ["-c", "--cpu-list", "-p", "--pid"], asking: [], numbered: 1 }],
  ["timeout", { valued: ["-k", "--kill-after", "-s", "--signal"], asking: [], numbered: 1 }],
  [
    "stdbuf",
    { valued: ["-i", "--input", "-o", "--output", "-e", "--error"], asking: [], numbered: 0 },
  ],
  ["time", { valued: ["-o", "--output", "-f", "--format"], asking: [], numbered: 0 }],
])
