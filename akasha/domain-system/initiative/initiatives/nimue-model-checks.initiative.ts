import type { Initiative } from "../initiative.page-type.ts"

export const nimueModelChecks = {
  id: "01a05394-26ba-7aab-9786-08fd2ba774a5",
  pageTypeSlug: "initiative",
  slug: "nimue-model-checks",
  domainSlug: "domain/checks-system",
  personaSlug: "nimue",
  intents: [
    { statement: "A page type's slug is renamed like any other slug." },
    { statement: "No tool spells a page type slug it could ask the index for." },
    {
      statement:
        "An index directory that does not stand refuses rather than answering as one holding nothing.",
    },
    {
      statement:
        "The phases a check states belong to the checks system rather than to one kind of check.",
    },
    { statement: "A check judged by code is a code check." },
    { statement: "Check is what both kinds of check stand under." },
    {
      statement:
        "A model check is a page type stating a prompt and its cases and a model family and the phases it runs on.",
    },
    { statement: "A prompt run over a change answers with the reasons a code check answers with." },
    { statement: "A model check's cases are run." },
    { statement: "A model check whose cases fail does not land." },
    { statement: "A model check judges a change or a file." },
  ],
  constraints: [
    "The work goes bottom up rather than downward from the layer above.",
    "What a change holds is read from the shadow, and which checks judge it is read from the committed index.",
    "The first model check judges at a workstation rather than through a gateway a supervisor stands up.",
  ],
} as const satisfies Initiative
