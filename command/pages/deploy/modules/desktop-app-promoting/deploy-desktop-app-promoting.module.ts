import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployDesktopAppPromoting = {
  id: "01a0e385-0533-7ab6-8120-5477927e5af5",
  type: "page-type/module",
  slug: "deploy-desktop-app-promoting",
  definition: "a desktop app put up by the promote script its own checkout carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is the folder named for the app's slug under the repositories root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The repositories root is what `REPOS_ROOT` names, or `repos` under the home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The script is `tools/promote.sh` in that checkout, run by bash with no argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The script's error stream is read beside its output as one run of lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the last lines the script wrote are answered, since a build writes thousands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script ending at anything but zero refuses the deploy with those last lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A promote is allowed the seconds this module names rather than the deploy's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The running of the script is handed in.",
    },
  ],
} as const satisfies Module
