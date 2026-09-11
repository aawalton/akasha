import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const upscaleRun = {
  id: "01a06815-9efd-7039-8365-178025ed0b07",
  type: "shell-script",
  slug: "upscale-run",
  definition: "one image carried through the clean-up stage and then the skin stage",
  shell: "sh",
  sourced: false,
  scripting: {},
} as const satisfies ShellScript
