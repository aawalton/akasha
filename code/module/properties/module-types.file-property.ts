import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const moduleTypes = {
  id: "01a0771e-597f-7d38-a6cf-073905063498",
  type: "page-type/file-property",
  slug: "module-types",
  propertySlug: "types",
  definition: "the type declarations a module's code and its callers both state",
  extensions: ["ts"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A module states its shared declarations here rather than in its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller naming a declaration alone does not load the code answering that declaration.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
