import type { ShellScript } from "@akasha/code-system/shell-script"

export const deployFunctions = {
  id: "01a06887-6590-7ef6-b6f5-49959a7c99f2",
  pageTypeSlug: "shell-script",
  slug: "deploy-functions",
  definition: "the names a cluster script sources for reaching the cluster",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A script sourcing deploy-functions sets _DEPLOY_LIB_DIR to the folder deploy-functions stands in.",
    },
    {
      invariantKind: "departure",
      statement: "Sourcing deploy-functions sources deploy-dns-functions.",
    },
  ],
} as const satisfies ShellScript
