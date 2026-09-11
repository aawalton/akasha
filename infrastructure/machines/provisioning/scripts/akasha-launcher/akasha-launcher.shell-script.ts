import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const akashaLauncher = {
  id: "01a07352-c56d-7d59-981a-3d7fa93e062d",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "akasha-launcher",
  definition:
    "the `akasha` name on PATH, handing what follows it to the dispatcher in the checkout",
  shell: "sh",
  sourced: false,
  scripting: {},
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name set on the line naming the call names the directory a run writes a CPU profile into.",
    },
    {
      invariantKind: "departure",
      statement:
        "The profiler is switched by a name set on the line rather than by a file the machine holds.",
    },
    {
      invariantKind: "departure",
      statement: "A name set to what is no directory profiles nothing and says so.",
    },
    {
      invariantKind: "absence",
      statement: "A run with that name unset carries no profiling flag.",
    },
  ],
  installPath: "~/.local/bin/akasha",
  onlyOn: "any",
} as const satisfies ShellScript
