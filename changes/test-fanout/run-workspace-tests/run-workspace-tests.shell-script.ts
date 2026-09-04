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
      statement: "A run that was told no bearing root is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workspace nested under this one is pruned so its files run under that workspace alone.",
    },
    {
      invariantKind: "departure",
      statement: "Enumerating no eligible test file where the map named a test file is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace that no changed file reaches passes rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture file is never run as a test.",
    },
    {
      invariantKind: "departure",
      statement: "Every line a shard prints carries that shard's name.",
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
  ],
} as const satisfies ShellScript
