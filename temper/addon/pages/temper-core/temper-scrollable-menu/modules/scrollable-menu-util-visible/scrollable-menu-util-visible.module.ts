import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilVisible = {
  id: "01a06275-c44a-7e89-9fe5-5c2fe3ca230b",
  type: "page-type/module",
  slug: "scrollable-menu-util-visible",
  definition: "the checks over which library dropdowns are currently visible",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scrollbar click is recognised by comparing against the bar and both arrow buttons.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Visibility is answered by walking the library's list of live menu objects.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next entry mouse-up is suppressed through a counting preventer variable.",
    },
  ],
} as const satisfies Module
