import type { Initiative } from "../initiative.page-type.ts"

export const nimueModelChecks = {
  id: "01a05394-26ba-7aab-9786-08fd2ba774a5",
  pageTypeSlug: "initiative",
  slug: "nimue-model-checks",
  domainSlug: "domain/checks-system",
  personaSlug: "nimue",
  notes: [
    "The order is bottom up because each layer's failure is invisible from the one above it. A model check that answers wrongly reads like a check that found something. A rename that half lands reads like a rename. Built downward, each of those would be debugged through the layer standing on it.",
    "Reading the shadow stops at discovery. What a change holds is read from the shadow, and which checks judge it is read from the committed index, because a change that chose its own judges could add a check that passes it or take away the check that refuses it.",
    "Checking reached its page type by a spelled slug and now reaches it by id, which no rename touches. What the slug intent is left with is every other place the tooling spells a page type slug.",
    "A model check reaches a model through the gateway a supervisor stands up, and no integration run has one. So the first model check judges at a workstation, and what it costs on every change is answered after it runs at all.",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "A page type the tooling reaches by slug is renamed without breaking the run that renames it.",
    },
    {
      invariantKind: "gap",
      statement:
        "The phases a check states belong to the checks system rather than to one kind of check.",
    },
    {
      invariantKind: "gap",
      statement: "A check judged by code is a code check.",
    },
    {
      invariantKind: "gap",
      statement: "Check is what both kinds of check stand under.",
    },
    {
      invariantKind: "gap",
      statement:
        "A model check is a page type stating a prompt and its cases and a model family and the phases it runs on.",
    },
    {
      invariantKind: "gap",
      statement: "A prompt run over a change answers with the reasons a code check answers with.",
    },
    {
      invariantKind: "gap",
      statement: "A model check's cases are run.",
    },
    {
      invariantKind: "gap",
      statement: "A model check whose cases fail does not land.",
    },
    {
      invariantKind: "gap",
      statement: "A model check judges a change or a file.",
    },
  ],
} as const satisfies Initiative
