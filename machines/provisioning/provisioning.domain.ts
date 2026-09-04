import type { Domain } from "@akasha/domain-system/domain"

export const provisioning = {
  id: "01a06861-49aa-7cbb-bded-bbd1af45e1b4",
  pageTypeSlug: "domain",
  slug: "provisioning",
  definition: "what a machine of Alan's is set up with before it can do work",
  partSlugs: [
    "page-type/provisioned-file",
    "python-module/btw5",
    "shell-script/ci-cost-snapshot",
    "shell-script/find-session",
    "shell-script/link-making",
    "shell-script/provision-macbook",
    "shell-script/provision-workstation",
    "shell-script/provisioning-bash-env",
    "shell-script/repo-roots",
    "shell-script/rg",
    "shell-script/setup-symlinks",
    "shell-script/wallpaper-black",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file a machine is set up with stands in akasha and is put in place from here.",
    },
    {
      invariantKind: "departure",
      statement: "Where a file goes is stated by the page rather than by the file's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A script that sets a machine up names the files it places rather than holding them.",
    },
    {
      invariantKind: "gap",
      statement:
        "The scripts still carry their own table of what to place rather than reading it from the pages.",
    },
  ],
} as const satisfies Domain
