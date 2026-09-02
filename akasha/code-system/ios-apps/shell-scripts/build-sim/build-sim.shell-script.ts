import type { ShellScript } from "../../../shell-scripts/shell-script.page-type.ts"

export const buildSim = {
  id: "01a059c3-3841-7618-b81d-ab1c53725140",
  pageTypeSlug: "shell-script",
  slug: "build-sim",
  definition: "what builds one app for a simulator and installs it there",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tree this script builds is the one rsynced to the machine this script runs on.",
    },
    {
      invariantKind: "departure",
      statement: "Which app this script is building is read from what this script was handed.",
    },
    {
      invariantKind: "departure",
      statement: "A site is looked for after the package's own add or sync rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "A build carrying no widget extension is refused rather than installed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is signed.",
    },
  ],
} as const satisfies ShellScript
