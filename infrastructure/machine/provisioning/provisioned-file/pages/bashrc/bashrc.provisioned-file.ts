import type { ProvisionedFile } from "akasha/infrastructure/machine/provisioning/provisioned-file/provisioned-file.page-type.types.ts"

export const bashrc = {
  id: "01a06862-af5c-7212-901d-4472fc61079c",
  type: "page-type/provisioned-file",
  slug: "bashrc",
  definition: "what an interactive bash shell on a machine of Alan's reads at start",
  content: "sh",
  placedBy: "link",
  onlyOn: "any",
  installPath: "~/.bashrc",
  filling: {},
  createdAt: "2026-09-03T17:48:13.020Z",
  updatedAt: "2026-09-15T16:18:59.000Z",
} as const satisfies ProvisionedFile
