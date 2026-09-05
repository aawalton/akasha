import type { ShellScript } from "@akasha/code-system/shell-script"

export const akashaLauncher = {
  id: "01a07352-c56d-7d59-981a-3d7fa93e062d",
  pageTypeSlug: "shell-script",
  slug: "akasha-launcher",
  definition:
    "the `akasha` name on PATH, handing what follows it to the dispatcher in the checkout",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
