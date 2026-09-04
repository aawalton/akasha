import type { ShellScript } from "@akasha/code-system/shell-script"

export const annualDump = {
  id: "01a06865-c012-7002-9b0e-5c1f7a2d3e02",
  pageTypeSlug: "shell-script",
  slug: "annual-dump",
  definition: "the whole database written out once a year and carried to the object store",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
