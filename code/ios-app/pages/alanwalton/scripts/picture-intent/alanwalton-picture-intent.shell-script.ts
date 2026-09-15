import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonPictureIntent = {
  id: "01a09c6a-b3b2-77f6-b74b-12dcf2597e31",
  type: "page-type/shell-script",
  slug: "alanwalton-picture-intent",
  definition: "the Swift of the Take Picture app intent",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "iOS opens no camera for an app that is not in the foreground.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The intent opens the app rather than running headless.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One press shows the camera, and the next press takes the picture and sends it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which press is which is read off whether the camera is on screen and ready rather than off a flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A press after a picture was sent starts a fresh capture.",
    },
  ],
} as const satisfies ShellScript
