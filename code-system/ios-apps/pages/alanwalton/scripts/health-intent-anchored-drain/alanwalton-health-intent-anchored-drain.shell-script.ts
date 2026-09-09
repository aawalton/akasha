import type { ShellScript } from "@akasha/code/shell-script"

export const alanwaltonHealthIntentAnchoredDrain = {
  id: "01a0595b-ef59-76d9-9265-f63a151d0fc6",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-intent-anchored-drain",
  definition: "the Swift draining one metric from its anchor",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The empty-page branch of the drain leaves the anchor where it was.",
    },
    {
      invariantKind: "departure",
      statement:
        "An anchor advanced over an empty page puts every sample behind it out of reach for good.",
    },
    {
      invariantKind: "departure",
      statement: "A failed upload leaves the anchor where it was.",
    },
    {
      invariantKind: "departure",
      statement: "Every sample in a batch the server refused is fetched again by the next run.",
    },
    {
      invariantKind: "departure",
      statement: "The seed window bounds a read only where there is no anchor to bound it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A date window beside an anchor drops what a run after a long outage would recover.",
    },
    {
      invariantKind: "departure",
      statement:
        "A metric that sent nothing routes into the backstop before the run reports on it.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing new to send is never reported on the anchored read's word alone.",
    },
  ],
} as const satisfies ShellScript
