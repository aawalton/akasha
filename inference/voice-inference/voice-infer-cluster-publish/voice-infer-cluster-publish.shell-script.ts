import type { ShellScript } from "@akasha/code-system/shell-script"

export const voiceInferClusterPublish = {
  id: "01a06815-9efd-701c-bcd5-2cd84cae11a1",
  pageTypeSlug: "shell-script",
  slug: "voice-infer-cluster-publish",
  definition: "the voice image built in the cluster and pushed to the cluster registry",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
