import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperAddonGenerators = {
  id: "01a06073-2499-7d6c-8220-9fb541b99067",
  pageTypeSlug: "workspace-package",
  slug: "temper-addon-generators",
  definition: "the source text of every data file temper renders from its own pages",
  manifest: "json",
  partSlugs: ["module/addon-data-page", "module/temper-alliance", "module/web-rule-quality"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generator here renders source text and writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "Where a rendered file lands is settled by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A rendered file carries no line telling a reader to leave that file alone.",
    },
    {
      invariantKind: "departure",
      statement: "That sentence is an invariant on the page of the module the file lands as.",
    },
  ],
} as const satisfies WorkspacePackage
