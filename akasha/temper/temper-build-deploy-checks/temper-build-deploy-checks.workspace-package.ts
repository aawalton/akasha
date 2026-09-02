import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperBuildDeployChecks = {
  id: "01a06287-7841-7e04-b566-2bb1b434877d",
  pageTypeSlug: "workspace-package",
  slug: "temper-build-deploy-checks",
  definition: "how a game add-on is judged before it is built and shipped",
  manifest: "json",
  partSlugs: [
    "module/population-bound",
    "module/error-message",
    "module/suggest-closest",
    "module/cli-args",
    "module/repo-root",
    "module/addon-roster-guard",
    "module/addon-source-files",
    "module/ts-node-shapes",
    "module/eso-doc-api-version",
    "module/eso-clone-artifacts",
    "module/check-eso-typings-fresh",
    "module/addon-dependency-cycle",
    "module/check-addon-dependency-cycle",
    "module/addon-dependency-floor",
    "module/check-addon-dependency-floor",
    "module/addon-orphan-xml-handler",
    "module/check-addon-orphan-xml-handler",
    "module/addon-inline-handler-dispatch",
    "module/check-addon-inline-handler-dispatch",
    "module/addon-hook-eager-capture",
    "module/check-addon-hook-eager-capture",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run here reads the game add-on tree rather than the akasha tree.",
    },
    {
      invariantKind: "departure",
      statement: "A run states how much of the population the run examined.",
    },
    {
      invariantKind: "constraint",
      statement: "A run that could not look reports that the run could not look.",
    },
    {
      invariantKind: "constraint",
      statement: "One module answers which files under an add-on are that add-on's own.",
    },
    {
      invariantKind: "gap",
      statement: "Most of what this package is made of is still outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
