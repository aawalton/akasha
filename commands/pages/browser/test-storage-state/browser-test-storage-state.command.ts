import type { Command } from "akasha/commands/command.page-type.types.ts"

export const browserTestStorageState = {
  id: "01a06862-06c8-7002-8a7a-7c207e2c7cd4",
  type: "command",
  slug: "browser-test-storage-state",
  definition:
    "the command signing the browser-test user in and writing the storage state a browser is seeded from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The user, the password, the origin and the backend keys are read from the environment.",
    },
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
      statement: "Healing sets the throwaway user's password to the one the environment states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The user the sign-in resolved to is checked against the protected user before any browser opens.",
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
      statement:
        "A sign-in that could not be made is a fault in the world rather than in the call.",
    },
    {
      invariantKind: "departure",
      statement: "The browser is closed whether the state was written or the sign-in refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the session the state this command wrote carries.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "test-storage-state",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/url" },
    { argument: "argument/sign-in-path" },
  ],
} as const satisfies Command
