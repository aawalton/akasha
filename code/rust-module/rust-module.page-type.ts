import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const rustModule = {
  id: "01a0602d-6acf-7594-86e8-07b54a35a700",
  type: "page-type/page-type",
  slug: "rust-module",
  definition: "a Rust crate's source code",
  parts: ["code-file-property/rust", "text-property/rust-module-name"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/rust", required: true, many: false },
    { pageProperty: "text-property/rust-module-name", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Rust module's code is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module reaches its siblings by `mod` rather than by a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cargo compiles the Rust.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug is too widely unique to be the name Cargo reads.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every Rust module states the name Cargo reads.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
