import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const buildSim = {
  id: "01a059c3-3841-7618-b81d-ab1c53725140",
  pageTypeSlug: "shell-script",
  type: "shell-script",
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
      statement:
        "Which app this script is building is read from the arguments this script was handed.",
    },
    {
      invariantKind: "departure",
      statement: "A site is looked for after the app's own add or sync rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest the install reads is written at the root of the delivered tree.",
    },
    {
      invariantKind: "departure",
      statement: "The install runs at that root rather than in the shell folder.",
    },
    {
      invariantKind: "absence",
      statement: "No folder of the delivered tree but its root carries a manifest.",
    },
    {
      invariantKind: "departure",
      statement:
        "The script making an app's native sources is run by name rather than by a manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A build with no widget extension is refused rather than installed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is signed.",
    },
  ],
} as const satisfies ShellScript
