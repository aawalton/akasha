import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const bootstrapNamespace = {
  id: "01a06865-abff-7011-9ff5-10eca740f08d",
  type: "shell-script",
  slug: "bootstrap-namespace",
  definition: "a workspace's namespace, manifests, secrets and CI role put up for the first time",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
