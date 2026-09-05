import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  pageTypeSlug: "workspace-package",
  slug: "pages-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",
  manifest: "json",
  partSlugs: [
    "workspace-package/components",
    "domain/pages-ui-action-verbs",
    "domain/pages-ui-app-version",
    "domain/pages-ui-supabase",
    "domain/pages-ui-block-editor",
    "domain/pages-ui-cache",
    "domain/pages-ui-capabilities",
    "domain/pages-ui-cover-click",
    "domain/pages-ui-frame",
    "domain/pages-ui-media",
    "domain/pages-ui-markdown",
    "module/navigation-context",
    "module/option-create-context",
    "domain/pages-ui-perf",
    "domain/pages-ui-contexts",
    "domain/pages-ui-tree",
    "domain/pages-ui-units",
    "domain/pages-ui-reorder-verbs",
    "module/use-user-id",
    "domain/pages-ui-mutators",
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Directive Is Not The Boundary",
      act: 'Reach pages from browser code through `@akasha/pages-ui`, with or without a `"use client"` line.',
      warrant:
        "That line is the gate's whole test, so a module without it reaches pages from the browser unchecked.",
      aids: [
        'Change the page import, never add `"use client"`.',
        "Do not touch code that never runs in the browser.",
      ],
    },
  ],
} as const satisfies WorkspacePackage
