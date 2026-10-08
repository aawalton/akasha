import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonNowPlayingCommands = {
  id: "01a11c38-887e-7403-93f8-c2a8d8984c37",
  type: "page-type/shell-script",
  slug: "alanwalton-now-playing-commands",
  definition: "the Swift taking the lock screen's play and pause for the app itself",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The app process takes play, pause and play-pause from the lock screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each command is handed to the page, which plays or pauses the audio.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commands are taken only while the page asks for them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Handing a command to the page runs inside a short background task.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS suspends the app once its audio stops.",
    },
  ],
  createdAt: "2026-10-08T15:53:49.437Z",
  updatedAt: "2026-10-08T15:53:49.437Z",
} as const satisfies ShellScript
