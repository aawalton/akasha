import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const designTokens = {
  id: "01a05c97-52ff-77b0-98f7-72e4e4e986e4",
  pageTypeSlug: "workspace-package",
  slug: "design-tokens",
  definition: "the colors an interface is drawn in, each held as an sRGB tuple",
  manifest: "json",
  parts: ["module/surface-color", "module/semantic-color", "module/text-color"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every color here is mirrored by a custom property `tokens.css` declares.",
    },
    {
      invariantKind: "departure",
      statement: "Every tuple here is worked out from the hex a color page states.",
    },
    {
      invariantKind: "absence",
      statement: "No color is written out here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the use of any color.",
    },
  ],
} as const satisfies WorkspacePackage
