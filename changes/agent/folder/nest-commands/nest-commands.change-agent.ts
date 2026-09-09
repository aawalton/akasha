import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const nestCommands = {
  id: "01a081b3-c5cb-70ec-b343-6e3500108eae",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "nest-commands",
  changeMode: "change-mode-move",
  definition: "one namespace's commands made its parts and moved into its folder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command whose slug opens with the namespace's slug and a hyphen is moved.",
    },
    {
      invariantKind: "departure",
      statement: "A command a longer namespace slug also opens is left to that namespace.",
    },
    {
      invariantKind: "departure",
      statement: "The namespace page is moved into the folder its own namespaces spell.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is named the page's slug with the slug of the page above taken off.",
    },
    {
      invariantKind: "departure",
      statement: "The page above a command's folder is that command's namespace.",
    },
    {
      invariantKind: "departure",
      statement: "The page above a namespace's folder is the namespace with that namespace.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that taking the slug above off would leave nothing of stays whole.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace under no namespace is moved into the commands folder itself.",
    },
    {
      invariantKind: "departure",
      statement: "A page already in the folder that page belongs in is left where it is.",
    },
    {
      invariantKind: "departure",
      statement: "A command the namespace names among its parts already is moved unparented.",
    },
    {
      invariantKind: "departure",
      statement: "Making a command a part of the namespace is left to the change of that name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Moving a page and the files it claims is left to the mechanical change moving that kind of file.",
    },
    {
      invariantKind: "departure",
      statement: "The path the page lands at is worked out here rather than by the change reached.",
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
      statement: "A command whose slug no namespace slug opens is moved nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "A command whose page sits outside the commands folder is moved nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
