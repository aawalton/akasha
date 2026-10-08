import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonLastPlace = {
  id: "01a11c62-1c8c-73d9-9445-a9bc7e1cdd6c",
  type: "page-type/shell-script",
  slug: "alanwalton-last-place",
  definition: "the Swift keeping the alanwalton.com address the app last showed",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cold launch opens the alanwalton.com address the app last showed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address is kept each time the web view moves, not as the app closes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sign-in, sign-up, sign-out, handover and api addresses are never kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an https address on alanwalton.com or its subdomains is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The address is kept on the phone alone, and the website knows nothing of it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS ends a sleeping app without telling it.",
    },
  ],
  createdAt: "2026-10-08T16:39:14.315Z",
  updatedAt: "2026-10-08T16:39:14.315Z",
} as const satisfies ShellScript
