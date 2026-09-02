import type { Module } from "@akasha/code-system/module"

export const watcherSessionFile = {
  id: "01a063d7-9fc3-7c30-8d80-51b599238c83",
  pageTypeSlug: "module",
  slug: "watcher-session-file",
  definition: "the json file holding what the watcher must remember between runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading and writing the config file goes through a store the caller may hand in.",
    },
    {
      invariantKind: "departure",
      statement: "The directory the config file sits in comes from the watcher paths module.",
    },
    {
      invariantKind: "departure",
      statement:
        "The directory the config file sits in is named rather than read off the file path.",
    },
    {
      invariantKind: "departure",
      statement: "The directory is made only where the directory is not there already.",
    },
    {
      invariantKind: "departure",
      statement: "The config file is readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "The config file lands whole or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "The config file is written with two spaces of indent.",
    },
    {
      invariantKind: "departure",
      statement: "The config file ends without a newline.",
    },
    {
      invariantKind: "departure",
      statement: "A config file that will not parse reads as no config.",
    },
    {
      invariantKind: "departure",
      statement: "A config file that is not there reads as no config.",
    },
    {
      invariantKind: "departure",
      statement: "A key of the config file the watcher does not know is kept on a write.",
    },
    {
      invariantKind: "departure",
      statement: "A key of the config file the watcher does not know is left out of a read.",
    },
    {
      invariantKind: "departure",
      statement: "A read carries the session key even where the config file holds no session.",
    },
    {
      invariantKind: "departure",
      statement: "A read fills in the server address the config file left out.",
    },
    {
      invariantKind: "departure",
      statement: "The server address filled in is handed in by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "One key is read and written and taken away without the whole config being typed.",
    },
    {
      invariantKind: "departure",
      statement: "A key held as anything other than a string reads as no value.",
    },
    {
      invariantKind: "departure",
      statement: "Taking away a key the config file does not hold writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Taking a key from a config file that is not there makes no config file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the environment.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which directory the watcher keeps its files in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a stored session means.",
    },
  ],
} as const satisfies Module
