import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const trafficCopProvision = {
  id: "01a06815-9efd-700d-8b2c-70b98e4a7248",
  type: "page-type/shell-script",
  slug: "traffic-cop-provision",
  definition: "the traffic cop's conda environment",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
