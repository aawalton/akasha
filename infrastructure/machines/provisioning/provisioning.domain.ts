import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const provisioning = {
  id: "01a06861-49aa-7cbb-bded-bbd1af45e1b4",
  type: "domain",
  slug: "provisioning",
  definition: "what a machine of Alan's is set up with before it can do work",
  parts: [
    "page-type/provisioned-file",
    "python-module/btw5",
    "shell-script/akasha-launcher",
    "shell-script/ci-cost-snapshot",
    "shell-script/find-session",
    "shell-script/link-making",
    "shell-script/provision-macbook",
    "shell-script/provision-workstation",
    "shell-script/repo-roots",
    "shell-script/rg",
    "shell-script/setup-symlinks",
    "shell-script/wallpaper-black",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file a machine is set up with sits in akasha and is put in place from here.",
    },
    {
      invariantKind: "departure",
      statement: "Where a file goes is stated by the page rather than by the file's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A script that sets a machine up names the files that script places rather than holding those files.",
    },
    {
      invariantKind: "departure",
      statement: "A file placed by a link under the home is linked there by every landing.",
    },
    {
      invariantKind: "departure",
      statement: "A move of the folder such a file sits in is caught by the landing that moves it.",
    },
    {
      invariantKind: "gap",
      statement:
        "The scripts still have their table of files to place rather than reading the table from the pages.",
    },
    {
      invariantKind: "gap",
      statement: "A file placed with rights the landing has not is placed by the script alone.",
    },
  ],
} as const satisfies Domain
