import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const typescriptBuildInfo = {
  id: "01a06dd5-7342-74de-8e60-7a85c3deef6e",
  type: "page-type/file-property",
  slug: "typescript-build-info",
  propertySlug: "typescript-build-info",
  definition: "what TypeScript already worked out about this tree, kept between runs",
  extensions: ["tsbuildinfo"],
  fileName: "tsconfig.tsbuildinfo",
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One file has the type state TypeScript worked out for the whole workspace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run reads the type state an earlier run left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run rechecks only the files that changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run over a change that never lands writes to this file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later run corrects that writing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This file has no record of the files a change reached.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
