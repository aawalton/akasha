import type { ShellScript } from "@akasha/code-system/shell-script"

export const esoRigClusterPublish = {
  id: "01a06866-58f8-7b2d-a395-8fde2d4bc9ab",
  pageTypeSlug: "shell-script",
  slug: "eso-rig-cluster-publish",
  definition: "the rig image built in the cluster and pushed to the cluster registry",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This script is the one committed way to build the rig image again.",
    },
    {
      invariantKind: "departure",
      statement: "The script runs from the workstation against the cluster builder.",
    },
    {
      invariantKind: "departure",
      statement: "The workstation reaches the cluster builder over the private network.",
    },
    {
      invariantKind: "departure",
      statement: "The image is pushed under one stable tag.",
    },
    {
      invariantKind: "absence",
      statement: "No tag names the commit the image was built from.",
    },
    {
      invariantKind: "constraint",
      statement: "A tag for every commit fills the registry's disk.",
    },
    {
      invariantKind: "departure",
      statement: "The image is built again whenever the recipe changes.",
    },
    {
      invariantKind: "departure",
      statement: "The image is built again whenever a file the recipe copies in changes.",
    },
    {
      invariantKind: "departure",
      statement: "The workload is rolled by hand after a push.",
    },
    {
      invariantKind: "constraint",
      statement: "A running pod pulls the tag again only when the pod is recreated.",
    },
  ],
} as const satisfies ShellScript
