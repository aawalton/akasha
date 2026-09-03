import type { Command } from "@akasha/command-system/command"

export const mobileSimTap = {
  id: "01a0685d-ceae-700d-a860-a518622e0d4a",
  pageTypeSlug: "command",
  slug: "mobile-sim-tap",
  definition: "the command tapping the simulator screen the way a finger would",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--selector <css>", takes: "the element to tap, found by CSS in the webview" },
    { said: "--x <px>", takes: "how far across the viewport to tap, with `--y`" },
    { said: "--y <px>", takes: "how far down the viewport to tap, with `--x`" },
  ],
  helpNotes: [
    "the tap is native rather than a click in the page, which is what raises the keyboard.",
    "a call names either an element or a point, and naming both is refused rather than chosen between.",
    "a point is named by both `--x` and `--y`, and one without the other is no point.",
    "the session already standing is what is tapped, so `mobile sim open-url` comes first.",
    "an element no selector finds is a refusal rather than a tap at nowhere.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call names either an element or a point.",
    },
    {
      invariantKind: "departure",
      statement: "An element and a point named together are refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A point is both its across and its down.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is native rather than a click in the page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
} as const satisfies Command
