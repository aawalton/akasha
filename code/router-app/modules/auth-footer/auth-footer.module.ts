import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authFooter = {
  id: "01a08e43-fb7d-780f-b702-af0566841b73",
  type: "module",
  slug: "auth-footer",
  definition: "the sidebar footer a person signs in from, or signs out of by posting a form",
  code: "tsx",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Signing out is a form POST rather than a call the browser makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collapsed sidebar shows the icon alone.",
    },
  ],
} as const satisfies Module
