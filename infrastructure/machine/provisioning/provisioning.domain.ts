import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const provisioning = {
  id: "01a06861-49aa-7cbb-bded-bbd1af45e1b4",
  type: "page-type/domain",
  slug: "provisioning",
  definition: "how a machine is prepared for work",
  parts: [
    "page-type/provisioned-file",
    "python-module/btw5",
    "shell-script/akasha-launcher",
    "shell-script/ci-cost-snapshot",
    "shell-script/find-session",
    "shell-script/repo-roots",
    "shell-script/rg",
    "shell-script/wallpaper-black",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a machine is set up with sits in akasha and is put in place from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a file goes is stated by the page rather than by the file's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The table of files to place is read from the pages rather than spelled by a placer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file placed by a link under the home is linked there by every landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move of the folder such a file sits in is caught by the landing that moves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file placed with rights the landing has not is placed by a command reading the same pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here installs a package or makes a swapfile on a machine being set up.",
    },
  ],
} as const satisfies Domain
