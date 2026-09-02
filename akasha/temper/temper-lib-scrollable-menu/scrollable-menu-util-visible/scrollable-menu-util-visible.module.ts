import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilVisible = {
  id: "01a06275-c44a-7e89-9fe5-5c2fe3ca230b",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-visible",
  definition: "the checks over which library dropdowns are currently visible",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A scrollbar click is recognised by comparing against the bar and both arrow buttons.",
    },
    {
      invariantKind: "constraint",
      statement: "Visibility is answered by walking the library's list of live menu objects.",
    },
    {
      invariantKind: "departure",
      statement: "The next entry mouse-up is suppressed through a counting preventer variable.",
    },
  ],
} as const satisfies Module
