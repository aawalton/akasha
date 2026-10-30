import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const deployFunctions = {
  id: "01a06887-6590-7ef6-b6f5-49959a7c99f2",
  type: "page-type/shell-script",
  slug: "deploy-functions",
  definition: "the names a cluster script reads in for reaching the cluster",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A script sourcing deploy-functions sets _DEPLOY_LIB_DIR to the folder deploy-functions sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sourcing deploy-functions sources deploy-dns-functions.",
    },
  ],
  scripting: {},
  createdAt: "2026-09-03T18:28:18.960Z",
  updatedAt: "2026-10-30T16:24:24.046Z",
} as const satisfies ShellScript
