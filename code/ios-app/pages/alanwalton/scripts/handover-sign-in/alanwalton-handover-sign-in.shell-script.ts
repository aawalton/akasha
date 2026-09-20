import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonHandoverSignIn = {
  id: "01a0bc8f-42cc-7238-85ea-f8f5339d96f8",
  type: "page-type/shell-script",
  slug: "alanwalton-handover-sign-in",
  definition: "the Swift trading a sign-in held in Safari for a code this app hands the site",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in opens in an authentication session rather than in this app's web view.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The address a sign-in opens is pinned in the Swift rather than taken from the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verifier is held in memory for the one call that made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-in Safari already holds is the sign-in this session reuses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call is answered with a code where the person closed the sign-in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback carrying no code is answered as a refusal.",
    },
  ],
} as const satisfies ShellScript
