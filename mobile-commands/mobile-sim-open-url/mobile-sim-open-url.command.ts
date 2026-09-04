import type { Command } from "@akasha/command-system/command"

export const mobileSimOpenUrl = {
  id: "01a0685d-ceae-7009-892c-425eee9c835b",
  pageTypeSlug: "command",
  slug: "mobile-sim-open-url",
  definition: "the command opening a route in the simulator and leaving a session standing at it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<path>", takes: "the route to open, standing for `--route`" },
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
  helpNotes: [
    "this is what leaves a session standing, and every driving command after it attaches to that session.",
    "a session already standing on the same simulator is reused rather than replaced.",
    "signing in is done by putting a session in before the route is navigated to, rather than by typing into a form.",
    "the identity is a throwaway by default, since anything typed in the simulator is written as whoever is signed in.",
    "`--as-real-user` is for reading what Alan's own pages look like and nothing is to be changed through it.",
    "the webview is taken hold of again after the navigation, since navigating drops the context.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session already standing on the same simulator is reused.",
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
      statement: "A call naming no simulator takes the session's own, else the first booted one.",
    },
  ],
} as const satisfies Command
