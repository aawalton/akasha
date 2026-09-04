import type { Module } from "@akasha/code-system/module"

export const installSimShell = {
  id: "01a05cee-e560-7cb3-8284-d288f21f913a",
  pageTypeSlug: "module",
  slug: "install-sim-shell",
  definition: "the native shell built on the macbook and installed to an ios simulator",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The sim build script's path is read off the app's page rather than walked to from the shell.",
    },
    {
      invariantKind: "departure",
      statement: "The build itself runs on the MacBook and only sources are sent to the MacBook.",
    },
    {
      invariantKind: "departure",
      statement:
        "Skipping the stage reuses the staged `www/` only where the staged `www/` is certified fresh.",
    },
    {
      invariantKind: "departure",
      statement: "The staged `www/` is rsynced to the MacBook apart from the native shell sources.",
    },
    {
      invariantKind: "departure",
      statement: "The installed simulator's udid is parsed back out of the remote build's output.",
    },
  ],
} as const satisfies Module
