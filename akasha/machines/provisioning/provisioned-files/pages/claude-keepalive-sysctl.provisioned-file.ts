import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const claudeKeepaliveSysctl = {
  id: "01a06862-af5d-70fb-bc36-ac464bb00297",
  pageTypeSlug: "provisioned-file",
  slug: "claude-keepalive-sysctl",
  definition: "how long an idle connection is held before the kernel probes it",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "/etc/sysctl.d/99-claude-keepalive.conf",
  reloadWith: "sudo sysctl --system",
} as const satisfies ProvisionedFile
