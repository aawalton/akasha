import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const containerRecipe = {
  id: "01a06815-9efd-7003-8c8e-4c03b44672b2",
  type: "page-type",
  slug: "container-recipe",
  definition: "the steps a container image is built from",
  parts: [
    "file-property/recipe",
    "module-property-group/composing",
    "text-property/recipe-repository",
  ],
  extends: ["page-type/service"],
  properties: [
    { pageProperty: "file-property/recipe", required: true, many: false },
    { pageProperty: "module-property-group/composing", required: false, many: false },
    { pageProperty: "text-property/recipe-repository", required: false, many: false },
  ],
  loadedBy: "module/group-writing",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A container recipe is in a file beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recipe has one image.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second image is a second page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a recipe copies from is read from the folder the build is handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a build is handed is the package the recipe sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recipe whose image is pushed names the repository it is pushed to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A recipe nothing pushes names no repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every recipe is composed by the group beside its page rather than written by hand.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
