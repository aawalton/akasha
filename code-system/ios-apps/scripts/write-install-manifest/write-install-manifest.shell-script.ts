import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const writeInstallManifest = {
  id: "01a090ef-1aa9-768a-b563-019e1697eae4",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "write-install-manifest",
  definition: "the manifest a delivered build tree is installed from, written at its root",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest is written at the root of the tree rather than beside the shell.",
    },
    {
      invariantKind: "departure",
      statement: "The packages named are the ones the app's page states as tool reached.",
    },
    {
      invariantKind: "departure",
      statement: "The range each package is named at is the range the akasha manifest states.",
    },
    {
      invariantKind: "absence",
      statement: "No script of an app's own is named in what this writes.",
    },
    {
      invariantKind: "departure",
      statement: "A build on a checkout writes nothing here, because akasha is already the root.",
    },
  ],
} as const satisfies ShellScript
