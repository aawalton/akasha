import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const instructionReferences = {
  id: "01a06810-92fe-71f1-911e-2447d3162638",
  pageTypeSlug: "cluster-check",
  slug: "instruction-references",
  definition:
    "the check refusing a tracked text file naming a document in the instructions repository",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "ts-file" },
    { nodeKind: "tsx-file" },
    { nodeKind: "js-file" },
    { nodeKind: "jsx-file" },
    { nodeKind: "css-file" },
    { nodeKind: "json-file" },
    { nodeKind: "yaml-file" },
    { nodeKind: "yml-file" },
    { nodeKind: "toml-file" },
    { nodeKind: "sh-file" },
    { nodeKind: "sql-file" },
    { nodeKind: "md-file" },
    { nodeKind: "txt-file" },
    { nodeKind: "swift-file" },
    { nodeKind: "lua-file" },
    { nodeKind: "rust-file" },
    { nodeKind: "dockerfile-file" },
    { nodeKind: "systemd-unit-file" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "This check outlives the world it names.",
    },
    {
      invariantKind: "absence",
      statement: "This check counts nothing.",
    },
  ],
} as const satisfies ClusterCheck
