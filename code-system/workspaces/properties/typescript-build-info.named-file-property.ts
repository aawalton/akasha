import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type TypescriptBuildInfo = "tsbuildinfo"

export const typescriptBuildInfo = {
  id: "01a06dd5-7342-74de-8e60-7a85c3deef6e",
  pageTypeSlug: "named-file-property",
  slug: "typescript-build-info",
  propertySlug: "typescript-build-info",
  definition: "what TypeScript already worked out about this tree, kept between runs",
  fileName: "tsconfig.tsbuildinfo",
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file holds the type state TypeScript worked out for the whole workspace.",
    },
    {
      invariantKind: "departure",
      statement: "A run reads the type state an earlier run left.",
    },
    {
      invariantKind: "departure",
      statement: "A run rechecks only the files that changed.",
    },
    {
      invariantKind: "departure",
      statement: "A run over a change that never lands writes to this file.",
    },
    {
      invariantKind: "departure",
      statement: "A later run corrects that writing.",
    },
    {
      invariantKind: "departure",
      statement: "The file is kept outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "This file holds no record of the files a change reached.",
    },
  ],
} as const satisfies NamedFileProperty
