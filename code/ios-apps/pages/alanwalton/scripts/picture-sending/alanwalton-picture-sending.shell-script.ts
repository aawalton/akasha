import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonPictureSending = {
  id: "01a09c6b-960a-7d45-83d0-10de2755297d",
  type: "shell-script",
  slug: "alanwalton-picture-sending",
  definition: "the Swift sending a picture to alanwalton.com",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is the jpeg alone.",
    },
    {
      invariantKind: "departure",
      statement: "The device secret is the one header naming the phone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing naming Alan rides along with the bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Every send ends in one sentence, shown on the camera and posted as a notice.",
    },
    {
      invariantKind: "departure",
      statement: "A send says whether the picture got there as well as what to read.",
    },
    {
      invariantKind: "constraint",
      statement: "The per-request timeout restarts on every byte that moves.",
    },
    {
      invariantKind: "departure",
      statement: "The whole transfer is bounded by a second timeout of thirty seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A send waits for no network to arrive.",
    },
  ],
} as const satisfies ShellScript
