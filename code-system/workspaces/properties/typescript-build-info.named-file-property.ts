import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type TypescriptBuildInfo = "tsbuildinfo"

export const typescriptBuildInfo = {
  id: "01a06dd5-7342-74de-8e60-7a85c3deef6e",
  pageTypeSlug: "named-file-property",
  slug: "typescript-build-info",
  propertySlug: "typescript-build-info",
  definition: "what TypeScript already worked out about this tree, kept between runs",
  fileName: "tsconfig.tsbuildinfo",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file holds what the whole workspace is known to be.",
    },
    {
      invariantKind: "departure",
      statement: "A run reads what an earlier run left and rechecks only what changed.",
    },
    {
      invariantKind: "departure",
      statement: "A run over a change that never lands writes here, and a later run corrects it.",
    },
    {
      invariantKind: "departure",
      statement: "The file is kept outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing about which files a change reached is held here.",
    },
  ],
} as const satisfies NamedFileProperty
