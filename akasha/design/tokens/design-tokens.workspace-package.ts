import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const designTokens = {
  id: "01a05c97-52ff-77b0-98f7-72e4e4e986e4",
  pageTypeSlug: "workspace-package",
  slug: "design-tokens",
  definition: "the colors an interface is drawn in, each held as an sRGB tuple",
  manifest: "json",
  partSlugs: ["module/surface-color", "module/semantic-color", "module/text-color"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every color here is mirrored by a custom property `tokens.css` declares.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what any color is used for.",
    },
  ],
} as const satisfies WorkspacePackage
