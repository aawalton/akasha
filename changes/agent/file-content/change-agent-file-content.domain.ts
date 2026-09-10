import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const changeAgentFileContent = {
  id: "01a07cc2-6223-7b0c-8d18-b219118df387",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-agent-file-content",
  definition: "a change an agent reaches acting on what a file has",
  parts: [
    "change-agent/change-file",
    "change-agent/add-property-value",
    "change-agent/change-domain-parent",
    "change-agent/change-page-page-property",
    "change-agent/remove-package-alias",
    "change-agent/remove-property-value",
    "change-agent/rename-code-token",
    "change-agent/rename-package",
    "change-agent/change-page-page-property-text",
    "change-agent/change-property-record-field",
    "change-agent/add-property-record",
    "change-agent/remove-property-record",
    "change-agent/move-code-export",
    "change-agent/add-property-values",
  ],
} as const satisfies Domain
