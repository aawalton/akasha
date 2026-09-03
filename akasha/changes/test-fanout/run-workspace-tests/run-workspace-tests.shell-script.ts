import type { ShellScript } from "@akasha/code-system/shell-script"

export const runWorkspaceTests = {
  id: "01a06869-9381-7001-8002-2d9b1bae664a",
  pageTypeSlug: "shell-script",
  slug: "run-workspace-tests",
  definition: "one workspace's tests of one type run, narrowed to those the changed files reach",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run that was told no bearing roots is refused, because it cannot prune the workspaces nested under it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workspace nested under this one is pruned so its files run under that workspace alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Enumerating no eligible test file where the map said there were some is a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "Selecting no test file because nothing changed reaches it is a pass rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture file is never run as a test.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every line a shard prints carries that shard's name, because the shards share one stdout.",
    },
    {
      invariantKind: "departure",
      statement:
        "A verdict is read from what the run printed rather than from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A crash under batch load is recorded for an isolated re-run rather than failing here.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the helpers stand in is found by walking up to the lockfile.",
    },
  ],
} as const satisfies ShellScript
