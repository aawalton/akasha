import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonPictureCapture = {
  id: "01a09c6a-ead3-701d-bb48-0fe59258d196",
  type: "shell-script",
  slug: "alanwalton-picture-capture",
  definition: "the Swift of the camera the Take Picture intent shows",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The camera is shown over whatever the app shows, full screen.",
    },
    {
      invariantKind: "departure",
      statement: "A tap on the shutter does what a press of the Action Button does.",
    },
    {
      invariantKind: "departure",
      statement: "A capture is taken only from a running session, so no blank frame is sent.",
    },
    {
      invariantKind: "departure",
      statement: "A press that finds the camera not ready says why on the camera and on a notice.",
    },
    {
      invariantKind: "departure",
      statement: "The picture leaves the phone at most 1600 across as a jpeg.",
    },
    {
      invariantKind: "departure",
      statement: "The camera stays up until the picture is sent, showing what happened.",
    },
    {
      invariantKind: "departure",
      statement: "A send that worked shows what happened, waits a beat, and puts the camera away.",
    },
    {
      invariantKind: "departure",
      statement: "A send that failed holds the reason up rather than putting the camera away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A press after a send that failed takes a fresh picture rather than sending again.",
    },
  ],
} as const satisfies ShellScript
