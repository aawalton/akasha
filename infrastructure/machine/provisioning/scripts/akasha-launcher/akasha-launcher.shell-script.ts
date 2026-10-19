import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const akashaLauncher = {
  id: "01a07352-c56d-7d59-981a-3d7fa93e062d",
  type: "page-type/shell-script",
  slug: "akasha-launcher",
  definition:
    "the `akasha` name on PATH, handing what follows it to the dispatcher in the checkout",
  shell: "sh",
  sourced: false,
  scripting: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name set on the line naming the call names the directory a run writes a CPU profile into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The profiler is switched by a name set on the line rather than by a file the machine holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name set to what is no directory profiles nothing and says so.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run with that name unset carries no profiling flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every run preloads the glob's module and defines the bundler's glob, wherever the call is made from.",
    },
  ],
  installPath: "~/.local/bin/akasha",
  onlyOn: "any",
  createdAt: "2026-09-05T20:46:39.469Z",
  updatedAt: "2026-10-19T20:14:51.597Z",
} as const satisfies ShellScript
