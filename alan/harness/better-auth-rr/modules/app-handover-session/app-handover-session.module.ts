import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appHandoverSession = {
  id: "01a0bc7d-2f57-79b3-8aa0-f4bb7ff7c9d3",
  type: "page-type/module",
  slug: "app-handover-session",
  definition: "the site's own Better Auth session traded for a code from the app",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is made by Better Auth's own endpoint rather than by a cookie written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That endpoint sits at no url and is reached by this server's own code alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That endpoint reads the code itself and takes no contributor on trust.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A code naming a contributor no user answers to opens a user from that contributor's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code naming a contributor that is no page either signs nobody in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor page holds a hash of an address rather than the address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A user opened from a contributor page takes that contributor's slug as its name and its address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That address is at handover.invalid, a domain no mail reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a holder of the handover signing key names a contributor in a code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A code that key signs is traded for a session whether or not a user was there already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused trade is a contributor of nobody rather than a thrown error.",
    },
  ],
} as const satisfies Module
