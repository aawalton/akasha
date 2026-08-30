import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const editorExtension = {
  id: "01a04e9f-4572-71cc-b8e2-3a86a855c6fc",
  pageTypeSlug: "domain",
  slug: "editor-extension",
  definition: "what the editor draws of the system it stands in",
  partSlugs: ["module/work-initiatives", "module/panel-domains"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor loads the extension's TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A feature that fails to start leaves the others running.",
    },
    {
      invariantKind: "departure",
      statement: "A panel finds its pages through the index, never by walking the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index named is opened for a value the index does not file.",
    },
  ],
} as const satisfies Domain
