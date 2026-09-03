import type { Command } from "@akasha/command-system/command"

export const browserTestStorageState = {
  id: "01a06862-06c8-7002-8a7a-7c207e2c7cd4",
  pageTypeSlug: "command",
  slug: "browser-test-storage-state",
  definition:
    "the command signing the browser-test user in and writing the storage state a browser is seeded from",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--url <origin>", takes: "the origin signed in to, the env's where none is said" },
    {
      said: "--sign-in-path <path>",
      takes: "the path the form stands at, `/sign-in` where none is said",
    },
    {
      said: "--at <path>",
      takes: "where the storage state is written, the registry's where none is said",
    },
  ],
  helpNotes: [
    "the user, the password and the project are read from the environment rather than said here.",
    "a sign-in refused for the wrong password is retried once, and only for the throwaway user.",
    "the retry sets the throwaway user's password to the one the environment states.",
    "the user signed in as is checked against the protected one before any browser opens.",
    "the file is written readable by its owner alone, since it carries a live session.",
    "the file this writes is not a page, so nothing here lands a commit.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sign-in is made through the app's own form rather than against the auth API.",
    },
    {
      invariantKind: "departure",
      statement: "A password refused is healed only for the throwaway user and only once.",
    },
    {
      invariantKind: "departure",
      statement: "The user the sign-in resolved to is checked against the protected one.",
    },
    {
      invariantKind: "departure",
      statement: "The file is written readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "A sign-in that ends still on the sign-in path is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The browser is closed whether the state was written or the sign-in refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the state it wrote carries.",
    },
  ],
} as const satisfies Command
