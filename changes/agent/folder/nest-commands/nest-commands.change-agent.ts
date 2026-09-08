import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const nestCommands = {
  id: "01a081b3-c5cb-70ec-b343-6e3500108eae",
  pageTypeSlug: "change-agent",
  slug: "nest-commands",
  changeModeSlug: "change-mode-move",
  definition: "one namespace's commands made its parts and carried into its folder",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command whose slug opens with the namespace's slug and a hyphen is carried.",
    },
    {
      invariantKind: "departure",
      statement: "A command a longer namespace slug also opens is left to that namespace.",
    },
    {
      invariantKind: "departure",
      statement: "The namespace page is carried into the folder its own namespaces spell.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace under no namespace is carried into the commands folder itself.",
    },
    {
      invariantKind: "departure",
      statement: "A page already in the folder that page belongs in is left where it is.",
    },
    {
      invariantKind: "departure",
      statement: "A command the namespace names among its parts already is carried unparented.",
    },
    {
      invariantKind: "departure",
      statement: "Making a command a part of the namespace is left to the change of that name.",
    },
    {
      invariantKind: "departure",
      statement: "Carrying a page and the files it claims is left to the change of that name.",
    },
    {
      invariantKind: "departure",
      statement: "Those changes are reached through the runner rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement: "The answers those changes give are gathered into one answer.",
    },
    {
      invariantKind: "absence",
      statement: "A command whose slug no namespace slug opens is carried nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
} as const satisfies ChangeAgent
