import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const layerMonotonicity = {
  id: "01a06810-92ff-7c25-8fc5-faa992dae9fb",
  pageTypeSlug: "cluster-check",
  slug: "layer-monotonicity",
  definition:
    "the check refusing a workspace depending on a package whose functional type outranks its own",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "json-file" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "It judges the dependency entries a package.json declares.",
    },
    {
      invariantKind: "absence",
      statement: "It judges none of the imports a package's source makes.",
    },
    {
      invariantKind: "departure",
      statement: "A declared package nothing reaches counts against the workspace declaring it.",
    },
    {
      invariantKind: "absence",
      statement: "An import with no dependency entry behind it counts against nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A package is ranked for how it is deployed rather than for what it exports.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace holding only pure modules ranks high once anything deploys it.",
    },
  ],
} as const satisfies ClusterCheck
