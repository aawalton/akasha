import type { ProvisionedFile } from "../provisioned-file.page-type.ts"

export const containerInsecureRegistries = {
  id: "01a06862-af5c-7fa0-91f1-92764202b14a",
  pageTypeSlug: "provisioned-file",
  slug: "container-insecure-registries",
  definition: "the cluster registry reached over plain http",
  content: "conf",
  placedBy: "link",
  onlyOn: "linux",
  installPath: "~/.config/containers/registries.conf.d/01-insecure-cluster-registry.conf",
} as const satisfies ProvisionedFile
