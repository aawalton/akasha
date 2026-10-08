import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const claudeKeepaliveSysctl = {
  id: "01a06862-af5d-70fb-bc36-ac464bb00297",
  type: "page-type/provisioned-file",
  slug: "claude-keepalive-sysctl",
  definition: "how long an idle connection is held before the kernel probes it",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "/etc/sysctl.d/99-claude-keepalive.conf",
  reloadWith: "sudo sysctl --system",
  createdAt: "2026-09-03T17:48:13.021Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
