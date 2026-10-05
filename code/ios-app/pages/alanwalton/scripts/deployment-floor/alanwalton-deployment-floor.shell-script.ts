import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonDeploymentFloor = {
  id: "01a0595b-ef58-7995-bdd6-75586caa5bab",
  type: "page-type/shell-script",
  slug: "alanwalton-deployment-floor",
  definition: "the lowest iOS version the app target is built for",
  shell: "sh",
  sourced: true,
} as const satisfies ShellScript
