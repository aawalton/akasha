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
      statement: "The browser is signed in as the contributor Alan's person page names.",
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
      statement: "A handover code is spent by its first use and dies thirty seconds after minting.",
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
  ],
} as const satisfies Command
