import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimPushTap = {
  id: "01a0685d-ceae-700a-91a5-034c3b41a91c",
  type: "command",
  slug: "mobile-sim-push-tap",
  definition:
    "the command sending a push to the simulator, tapping its banner and reading what the tap did",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "A cold run terminates the app before the push goes out.",
    },
    {
      invariantKind: "departure",
      statement: "A push delivered is named as soon as that push is delivered.",
    },
    {
      invariantKind: "departure",
      statement: "An Appium server this started is named before the wait for it to answer.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw after the push names that push in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The push script is named before that script is run.",
    },
    {
      invariantKind: "departure",
      statement: "The naming of that script says the file it writes and the app it terminates.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw inside the push script names that script in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A run refused for want of a trace names what was done as well as why.",
    },
    {
      invariantKind: "departure",
      statement: "The answer and the refusal are drawn from that one list of what was done.",
    },
    {
      invariantKind: "departure",
      statement: "The pushing, the opening, the tapping, the tracing and the ending are handed in.",
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
