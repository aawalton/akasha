import type { ShellScript } from "@akasha/code-system/shell-script"

export const alanwaltonStageApp = {
  id: "01a0595b-ef5e-7f37-9cb1-0194673c0f0d",
  pageTypeSlug: "shell-script",
  slug: "alanwalton-stage-app",
  definition: "the in-shell SPA built and put where Capacitor serves it",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
