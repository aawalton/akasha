import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const esoRigImage = {
  id: "01a06866-58f8-7e1d-aa92-5be1e93a86f2",
  pageTypeSlug: "container-recipe",
  slug: "eso-rig-image",
  definition: "the image an X server, a virtual keyboard and Wine run from on a cluster card",
  recipe: "dockerfile",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The base is a plain distro rather than an image carrying NVIDIA libraries.",
    },
    {
      invariantKind: "departure",
      statement: "The base tag fixes the version of every package from that release pocket.",
    },
    {
      invariantKind: "absence",
      statement: "No package from the base pocket carries a version of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A version is pinned where the version is a real choice.",
    },
    {
      invariantKind: "departure",
      statement: "The build proves on disk every file the rig cannot start without.",
    },
    {
      invariantKind: "departure",
      statement: "The build proves on disk every binary the rig cannot start without.",
    },
    {
      invariantKind: "absence",
      statement: "No GPU reading is taken at build time.",
    },
    {
      invariantKind: "constraint",
      statement: "The builder has no card and no injected driver.",
    },
  ],
} as const satisfies ContainerRecipe
