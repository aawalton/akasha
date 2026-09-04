import type { Module } from "@akasha/code-system/module"

export const calling = {
  id: "01a04bdd-596d-7b89-a6ed-1d12396208f3",
  pageTypeSlug: "module",
  slug: "calling",
  definition: "a name from the command line answered by the command that carries it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's page names the export the command runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command that repairs the index is found by its path rather than through the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command found by its path is listed among the commands only when its page stands.",
    },
    {
      invariantKind: "departure",
      statement: "A name is the leading words of the command line joined with a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A word that could be no part of a slug ends the name before that word.",
    },
    {
      invariantKind: "departure",
      statement: "A name is at most four words long.",
    },
    {
      invariantKind: "departure",
      statement: "The longest name a command carries is the name read.",
    },
    {
      invariantKind: "departure",
      statement: "A shorter name is read only where the longer name is carried by no command.",
    },
    {
      invariantKind: "departure",
      statement: "The words past the name are the arguments the command is handed.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a command costs at most four reads of the index.",
    },
    {
      invariantKind: "departure",
      statement: "A name carried by more than one command is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A name no command carries is answered with the commands there are.",
    },
    {
      invariantKind: "departure",
      statement: "What the commands there are is read only where a name was not answered.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no page type for commands is not an index carrying no command.",
    },
    {
      invariantKind: "departure",
      statement: "The change kind a call already carries holds over the one the page names.",
    },
    {
      invariantKind: "departure",
      statement: "A command is handed the change kind its page names.",
    },
    {
      invariantKind: "departure",
      statement: "What runs on a kind is read off that kind's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind that will not be read is handed to the command as no kind.",
    },
    {
      invariantKind: "departure",
      statement: "A command handed no change kind runs every check and every warrant.",
    },
  ],
} as const satisfies Module
