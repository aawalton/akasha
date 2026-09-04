import type { ShellScript } from "@akasha/code-system/shell-script"

export const trafficCopProvision = {
  id: "01a06815-9efd-700d-8b2c-70b98e4a7248",
  pageTypeSlug: "shell-script",
  slug: "traffic-cop-provision",
  definition: "the conda environment the traffic cop runs in",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
