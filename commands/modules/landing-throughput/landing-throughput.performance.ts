import type { Performance } from "@akasha/code/performance"

export const landingThroughput = {
  id: "01a08789-2005-7546-8b63-bcb5f2322cc7",
  pageTypeSlug: "performance",
  slug: "landing-throughput",
  definition: "how many landings a second one worktree takes while every lane contends",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The landings are measured over a scratch worktree rather than this checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Every lane is a process of its own, because the hold is between processes.",
    },
    {
      invariantKind: "departure",
      statement: "The lanes are held at a gate so that the lanes start together.",
    },
    {
      invariantKind: "departure",
      statement: "The rate is the landings over the wall time from the gate to the last exit.",
    },
    {
      invariantKind: "departure",
      statement: "A lane's own time covers that lane's wait as well as that lane's hold.",
    },
    {
      invariantKind: "absence",
      statement: "No figure here is judged against a limit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the hold apart from the landing around it.",
    },
  ],
} as const satisfies Performance
