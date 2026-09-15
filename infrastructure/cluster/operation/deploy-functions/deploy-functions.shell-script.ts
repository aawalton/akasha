import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const deployFunctions = {
  id: "01a06887-6590-7ef6-b6f5-49959a7c99f2",
  type: "page-type/shell-script",
  slug: "deploy-functions",
  definition: "the names a cluster script sources for reaching the cluster",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A script sourcing deploy-functions sets _DEPLOY_LIB_DIR to the folder deploy-functions sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Sourcing deploy-functions sources deploy-dns-functions.",
    },
  ],
  scripting: {},
} as const satisfies ShellScript
