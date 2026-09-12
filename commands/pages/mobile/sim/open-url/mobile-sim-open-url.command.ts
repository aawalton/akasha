import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimOpenUrl = {
  id: "01a0685d-ceae-7009-892c-425eee9c835b",
  type: "command",
  slug: "mobile-sim-open-url",
  definition: "the command opening a route in the simulator and leaving a session at it",
  code: "ts",
  taking: [
    { said: "<path>", takes: "the route to open, representing `--route`" },
    { said: "--route <path>", takes: "the route to open, such as `/home` or a page's own path" },
    { said: "--app <slug>", takes: "the app to open it in, the default app where none is said" },
    { said: "--kb-debug", takes: "mount the keyboard-geometry readout over the block editor" },
    {
      said: "--as-real-user",
      takes: "sign in as Alan to read what only he can see, and change nothing through it",
    },
    {
      said: "--udid <udid>",
      takes:
        "the simulator to open it on, the session's own or the first booted where none is said",
    },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A session already there on the same simulator is reused.",
    },
    {
      invariantKind: "departure",
      statement: "An identity is put in before a route is navigated to.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying nothing about identity signs in as the throwaway.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is changed through Alan's own identity.",
    },
    {
      invariantKind: "departure",
      statement: "The webview is taken hold of again after a navigation.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no simulator takes the session's own simulator or the first booted simulator.",
    },
  ],
  name: "open-url",
} as const satisfies Command
