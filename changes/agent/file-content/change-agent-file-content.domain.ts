import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentFileContent = {
  id: "01a07cc2-6223-7b0c-8d18-b219118df387",
  pageTypeSlug: "domain",
  slug: "change-agent-file-content",
  definition: "a change an agent reaches acting on what a file holds",
  partSlugs: [
    "change-authored/change-file",
    "change-checked/add-property-value",
    "change-agent/change-domain-parent",
    "change-agent/change-page-property",
    "change-agent/remove-package-alias",
    "change-agent/remove-property-value",
    "change-agent/rename-code-token",
    "change-checked/rename-package",
    "change-agent/change-page-property-text",
  ],
} as const satisfies Domain
