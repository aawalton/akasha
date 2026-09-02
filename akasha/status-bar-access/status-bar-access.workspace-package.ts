import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const statusBarAccess = {
  id: "01a05c9d-4096-7000-9ca0-5ff9f4e38802",
  pageTypeSlug: "workspace-package",
  slug: "status-bar-access",
  definition: "a day's readings taken with the page store bound into the readout engine",
  manifest: "json",
  partSlugs: ["module/ask-through", "module/session-reading"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The engine these readings are drawn by stands outside akasha in `readouts/`.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every export here binds a port the engine asks through and forwards what the engine answers.",
    },
    {
      invariantKind: "departure",
      statement: "A caller states the day and nothing more.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a reading means or what color the reading draws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store itself.",
    },
  ],
} as const satisfies WorkspacePackage
