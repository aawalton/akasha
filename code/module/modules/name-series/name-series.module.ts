import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nameSeries = {
  id: "01a069d1-a0b9-7000-b6eb-54718b0a4502",
  type: "page-type/module",
  slug: "name-series",
  definition:
    "a census of names divided into module pages that fit and the page composing them back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing under akasha lands at or past the file ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line longer than the run budget is put in a run of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run line budget is recovered from the runs already there rather than chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already at a slug keeps the id that page had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type a rendered page imports is reached by the id that type carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where that type sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rendered page imports the type file beside that page type rather than the page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rendered page names its type and each run from the root rather than relatively.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The aggregate declares the whole set rather than re-exporting the runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last page rendered is the aggregate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run no longer reached is taken away rather than left unimported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already with the body rendered is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The aggregate carries no note of where the census was read from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An empty census renders nothing rather than a clean answer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing under akasha is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each body staged is named to the caller as soon as that body is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message and the landing script are named apart from the bodies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The runs already there are asked of the index rather than read off the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The aggregate's page is written once and never staged again, so a hand's work on it stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The landing script rewrites the owning page's parts to name exactly the pages a run filled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part naming no page of the series keeps its place in the owning page's parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages filled are named where the first page of the series was, or after the last part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The owning page is reached by the id that page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The owning page's parts are rewritten before any page of the series is taken away.",
    },
  ],
} as const satisfies Module
