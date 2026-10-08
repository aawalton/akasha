import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const containerInsecureRegistries = {
  id: "01a06862-af5c-7fa0-91f1-92764202b14a",
  type: "page-type/provisioned-file",
  slug: "container-insecure-registries",
  definition: "the cluster registry reached over plain http",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/containers/registries.conf.d/01-insecure-cluster-registry.conf",
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
