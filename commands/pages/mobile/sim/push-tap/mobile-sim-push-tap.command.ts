import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimPushTap = {
  id: "01a0685d-ceae-700a-91a5-034c3b41a91c",
  type: "command",
  slug: "mobile-sim-push-tap",
  definition:
    "the command sending a push to the simulator, tapping its banner and reading what the tap did",
  code: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A cold run terminates the app before the push goes out.",
    },
    {
      invariantKind: "departure",
      statement: "A cold run finding the app still running is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A banner is tapped where a banner sits rather than by being found.",
    },
    {
      invariantKind: "departure",
      statement: "A bundle exposing no trace instrument is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A trace is waited for rather than read once.",
    },
    {
      invariantKind: "departure",
      statement: "The session opened to tap the banner is ended whatever the tap did.",
    },
  ],
  name: "push-tap",
  arguments: [
    { argument: "argument/app" },
    { argument: "argument/udid" },
    { argument: "argument/route", required: true, saidAs: "flag-or-word" },
    { argument: "argument/warm" },
    { argument: "argument/title" },
  ],
} as const satisfies Command
