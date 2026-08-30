import type { Initiative } from "../initiative.page-type.ts"

export const nimueModelChecks = {
  id: "01a05394-26ba-7aab-9786-08fd2ba774a5",
  pageTypeSlug: "initiative",
  slug: "nimue-model-checks",
  domainSlug: "domain/checks-system",
  personaSlug: "nimue",
  notes: [
    "The order is bottom up because each layer's failure is invisible from the one above it. A model check that answers wrongly reads like a check that found something. A rename that half lands reads like a rename. A check discovered from the committed index reads like a check that ran. Built downward, each of those would be debugged through the layer standing on it.",
    "Checking spells the slug of the page type it loads. Once discovery reads the shadow, a rename of that page type cannot land while the literal stands, because discovery would look in the shadow for a page type the change took away and find none. Either the move carries that one authored line with it, or nothing in the tooling spells a page type slug. Which of those is not settled.",
    "A model check reaches a model through the gateway a supervisor stands up, and no integration run has one. So the first model check judges at a workstation, and what it costs on every change is answered after it runs at all.",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "The change a shadow is cast over and the change a check is shown are one shape with one home.",
    },
    {
      invariantKind: "gap",
      statement: "The shadow answers what a change makes unique and stops making unique.",
    },
    {
      invariantKind: "gap",
      statement:
        "A value minted into a change is worked out from the index that change would leave.",
    },
    {
      invariantKind: "gap",
      statement: "Which checks stand is read from the shadow.",
    },
    {
      invariantKind: "gap",
      statement: "A move either refuses or lands a change that passes checks.",
    },
    {
      invariantKind: "gap",
      statement:
        "A move renames a page's slug and repoints every typed edge that addresses it, in the same act.",
    },
    {
      invariantKind: "gap",
      statement:
        "A page type the tooling reaches by slug is renamed without breaking the run that renames it.",
    },
    {
      invariantKind: "gap",
      statement: "The phases a check states belong to the checks system, not to one kind of check.",
    },
    {
      invariantKind: "gap",
      statement:
        "A check judged by code is a code check, and check is what both kinds of check stand under.",
    },
    {
      invariantKind: "gap",
      statement:
        "A model check is a page type stating a prompt, its cases, a model family, and the phases it runs on.",
    },
    {
      invariantKind: "gap",
      statement: "A prompt run over a change answers with the reasons a code check answers with.",
    },
    {
      invariantKind: "gap",
      statement: "A model check's cases are run, and one whose cases fail does not land.",
    },
    {
      invariantKind: "gap",
      statement: "A model check judges a change or a file.",
    },
  ],
} as const satisfies Initiative
