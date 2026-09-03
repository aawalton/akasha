import type { Command } from "@akasha/command-system/command"

export const mobileSimPushTap = {
  id: "01a0685d-ceae-700a-91a5-034c3b41a91c",
  pageTypeSlug: "command",
  slug: "mobile-sim-push-tap",
  definition:
    "the command sending a push to the simulator, tapping its banner and reading what the tap did",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<path>", takes: "the route the push carries, standing for `--route`" },
    { said: "--route <path>", takes: "the route the push carries, such as a question's own path" },
    { said: "--app <slug>", takes: "the app the push is for, the default app where none is said" },
    {
      said: "--warm",
      takes: "leave the app running, so the tap measures a warm open rather than a cold one",
    },
    {
      said: "--udid <udid>",
      takes: "the simulator to push to, the session's own or the first booted where none is said",
    },
    { said: "--title <text>", takes: "the notification's title, `Tap probe` where none is said" },
  ],
  helpNotes: [
    "this makes what a tap on a notification does measurable on demand rather than only when one arrives.",
    "the app is terminated first by default, since a cold open is the one worth measuring.",
    "a cold run where the app is still running is refused, because it would have measured a warm open and said cold.",
    "the banner is tapped where a banner sits rather than by finding it, since a banner is not in the page.",
    "the trace is read out of the running app, so a build carrying no trace instrument is refused rather than answered empty.",
    "the trace is waited for rather than read once, since the app has to start before it can write one.",
    "the session opened to tap the banner is ended afterwards, whether the tap led anywhere or not.",
  ],
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
} as const satisfies Command
