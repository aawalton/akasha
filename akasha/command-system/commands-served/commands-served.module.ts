import type { Module } from "@akasha/code-system/module"

export const commandsServed = {
  id: "01a06a01-acd1-7e50-9625-c26fe1fb1044",
  pageTypeSlug: "module",
  slug: "commands-served",
  definition: "which commands the held-open server answers, and how stale what answers may get",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Both ends read the served commands from here rather than each holding a list of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command served at one end and spawned at the other pays the startup the server saves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a Bun global.",
    },
    {
      invariantKind: "departure",
      statement: "The editor's node host imports the module as the bun server does.",
    },
    {
      invariantKind: "departure",
      statement: "The module holds names and numbers alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A server dies on a clock rather than trusting a watcher over the edits a lane makes.",
    },
    {
      invariantKind: "departure",
      statement: "A lease turning over costs one bun startup.",
    },
    {
      invariantKind: "departure",
      statement: "A bun startup is near 0.19s of wall and 0.22s of CPU.",
    },
    {
      invariantKind: "departure",
      statement: "Thirty seconds of lease costs under a hundredth of a core.",
    },
    {
      invariantKind: "departure",
      statement: "A per-second poller costs a fifth of a core.",
    },
    {
      invariantKind: "departure",
      statement:
        "The lease bound is a number read from the environment rather than the constant alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A stated lease that is not a positive number is the default.",
    },
    {
      invariantKind: "constraint",
      statement: "A bound read as NaN is no bound.",
    },
  ],
} as const satisfies Module
