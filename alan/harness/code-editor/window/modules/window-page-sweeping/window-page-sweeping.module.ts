import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowPageSweeping = {
  id: "01a0a166-9b55-7421-ab40-928cc3618bd6",
  type: "page-type/module",
  slug: "window-page-sweeping",
  definition: "the page of every editor window that is no longer open taken away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's page goes where the process that window's slug names is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's page stays where the process that window's slug names is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window's slug states a process the way a seat's process key states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pid whose start tick differs from the slug's names another process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose slug states no process key is left as that page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug stating a start tick of zero states no process key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page left either way is counted and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process whose stat file will not read leaves its page as that page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal is composed by a daemon rather than authored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal is asked of the pages service rather than landed in process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal states the commit the checkout was at before its windows were read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That removal lands mechanically and owes no read record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The origin that ask reaches is the one a workstation reading answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines beside a page go with a plain remove after that page has landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading kept over a page's path goes with the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages go in one call to land in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is tried alone where that call refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page still there after a refusal is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is taken away unless the sweep is asked to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep finding every window open lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are what the index answers rather than a folder listed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page's age is read to decide what goes.",
    },
  ],
} as const satisfies Module
