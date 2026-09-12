import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const calling = {
  id: "01a04bdd-596d-7b89-a6ed-1d12396208f3",
  type: "module",
  slug: "calling",
  definition: "a name from the command line answered by the command that has it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command's page names the export the command runs.",
    },
    {
      invariantKind: "departure",
      statement: "What one command run cost is appended beside the page of the command that ran.",
    },
    {
      invariantKind: "departure",
      statement: "The cost is taken around the whole call rather than around any part of it.",
    },
    {
      invariantKind: "departure",
      statement: "A call reaching no command is recorded nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "A line appended here takes no turn over any file another writer has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement: "The file with a command's code is answered from the page the index names.",
    },
    {
      invariantKind: "departure",
      statement: "No call here refreshes the index, whatever the index is missing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no command where the index is unusable names the call that builds one.",
    },
    {
      invariantKind: "departure",
      statement: "The call that refreshes the index is answered where the index is unusable.",
    },
    {
      invariantKind: "departure",
      statement: "The code that refreshes the index is imported rather than named by a path.",
    },
    {
      invariantKind: "departure",
      statement: "Each leading word of the command line steps one level down the command tree.",
    },
    {
      invariantKind: "departure",
      statement: "A level's name is the words walked down to that level joined with a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A word that could be no part of a slug ends the walk before that word.",
    },
    {
      invariantKind: "departure",
      statement: "The deepest level the walk reaches a command at is the command called.",
    },
    {
      invariantKind: "departure",
      statement: "A level with no command is walked through rather than ending the walk.",
    },
    {
      invariantKind: "departure",
      statement:
        "The words past the level a command sits at are the arguments the command is handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "How deep the walk goes is bounded by the words the line offers rather than by a count.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a command costs one read of the index for each level walked.",
    },
    {
      invariantKind: "departure",
      statement: "A name carried by more than one command is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A command is told the call as that call was written on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A help answer is titled by the call that reached the command.",
    },
    {
      invariantKind: "departure",
      statement: "A help answer carries the directives the command's own page states.",
    },
    {
      invariantKind: "departure",
      statement: "It carries the directives every namespace above that command states.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace above is named by the leading words joined with a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "The namespaces are read widest first, and the command's own come last.",
    },
    {
      invariantKind: "absence",
      statement: "No directive a page type states reaches a help answer.",
    },
    {
      invariantKind: "departure",
      statement: "The invariant kinds that do not hold yet are the kinds naming the intent group.",
    },
    {
      invariantKind: "departure",
      statement: "Which kinds those are is read off the index rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace listing is titled by the call that reached the namespace.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name no command and no namespace carries is answered with the commands there are.",
    },
    {
      invariantKind: "departure",
      statement: "A name the caller got wrong is refused as a fault of the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fault in the index or in a command's own page is refused as a fault of the data.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a name near a command's or a namespace's is refused with that name pointed at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a namespace has rather than a command is answered with what that namespace holds.",
    },
    {
      invariantKind: "departure",
      statement: "The deepest namespace the words reach is the namespace answered with.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace is looked for only where the words reached no command.",
    },
    {
      invariantKind: "departure",
      statement: "A part is listed by the name that part's own page states.",
    },
    {
      invariantKind: "departure",
      statement: "A part stating no name is listed by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A part is listed with the definition that part's own page states.",
    },
    {
      invariantKind: "departure",
      statement: "A part that is no command and no namespace is listed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "The root of the tree is listed the way a namespace is listed.",
    },
    {
      invariantKind: "departure",
      statement: "The root's parts are the parts the page type saying what a command is states.",
    },
    {
      invariantKind: "absence",
      statement: "No listing reads the whole roster of commands.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace with no part is answered as a name no command carries.",
    },
    {
      invariantKind: "departure",
      statement: "The whole list of commands is read only where a name was not answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command in that list is written as the call reaching it rather than as its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The name such a refusal points at is written the same way.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the index carries a command at all is answered without loading a page.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no page type for commands is not an index with no command.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks a kind runs and the readings a change of that kind owes are read off its page.",
    },
    {
      invariantKind: "absence",
      statement: "No command is handed a change kind.",
    },
    {
      invariantKind: "departure",
      statement: "A command is stopped where that command runs past the seconds its page allows.",
    },
  ],
} as const satisfies Module
