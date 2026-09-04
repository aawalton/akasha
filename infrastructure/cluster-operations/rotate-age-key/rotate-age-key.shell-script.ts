import type { ShellScript } from "@akasha/code-system/shell-script"

export const rotateAgeKey = {
  id: "01a06865-abff-7017-8cbf-dc0bbf0684a8",
  pageTypeSlug: "shell-script",
  slug: "rotate-age-key",
  definition: "a new age keypair minted and every SOPS file re-keyed onto it",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
