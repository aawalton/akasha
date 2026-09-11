import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const writeCapacitorConfig = {
  id: "01a05934-fe0e-7785-bb6a-bdfc081e0a63",
  type: "shell-script",
  slug: "write-capacitor-config",
  definition: "the bundle id and display name put into a shell's Capacitor config",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The config is written at the root of the tree the shell sits in.",
    },
    {
      invariantKind: "departure",
      statement: "An app's web directory and native sources are named from that root.",
    },
    {
      invariantKind: "departure",
      statement:
        "The plugins an app takes are the ones its page names rather than the root's whole list.",
    },
  ],
} as const satisfies ShellScript
