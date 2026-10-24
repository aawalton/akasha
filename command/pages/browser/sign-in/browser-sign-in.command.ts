import type { Command } from "akasha/command/command.page-type.types.ts"

export const browserSignIn = {
  id: "01a0d4aa-9729-746e-bb1a-3dc8b0f23b58",
  type: "page-type/command",
  slug: "browser-sign-in",
  definition: "the command writing the code that signs a driven browser in to a deployed site",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The browser is signed in as the contributor the named person's page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--person` names that person, and Alan is signed in as where it is not said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser signed in as a person other than Alan only looks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The site refuses every send from a browser that only looks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that only looks ends fifteen minutes after the exchange.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A peripheral's origin is refused for a person other than Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The file written is a Playwright function signing the page in and opening the path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file carries a handover code rather than a session.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A code a driver echoes can be taken again until thirty seconds after minting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session never reaches the file, the answer, or the code a driver echoes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is readable by its owner alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A localhost origin is refused rather than signed in to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is the path written and nothing more.",
    },
  ],
  name: "sign-in",
  arguments: [
    { argument: "argument/url", required: true },
    { argument: "argument/path", required: true },
    { argument: "argument/out", required: true },
    { argument: "argument/person" },
  ],
  createdAt: "2026-09-24T18:25:44.745Z",
  updatedAt: "2026-10-24T21:58:00.003Z",
} as const satisfies Command
