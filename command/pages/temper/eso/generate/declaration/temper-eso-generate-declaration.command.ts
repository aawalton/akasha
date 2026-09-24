import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateDeclaration = {
  id: "01a0685d-f8fa-7755-9f01-412ee9b28025",
  type: "page-type/command",
  slug: "temper-eso-generate-declaration",
  definition: "the command writing the game's API declarations from the game's own documentation",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The documentation read is the `~/esoui` clone's `ESOUIDocumentation.txt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The opt-in manifest rather than the documentation decides which tokens are declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function the documentation marks private or protected is declared for no addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enum a kept token names is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An object above a kept object is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is written onto a page rather than into a folder of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the ones stating this command wrote them, found by that stamp.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page states the command that wrote it and the API version it was built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page this run makes is stamped as the pages already there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The division between pages is kept, so a run changing nothing divides nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page over the ceiling hands its last group on, and a page emptied goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a hand-written declaration states is left out rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type alias under a name the compiler declares is left out too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no checkout writes into what `CODE_ROOT` names, else this repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declarations land as one mechanical change rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the checkout already has is left out of that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type the documentation states that no declaration may carry refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run refusing over such a type writes nothing and names each such type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No type reaches a declaration unjudged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no declaration may be written under refuses the call as such a type does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No name reaches a declaration unjudged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name the checkout declares already is declared no second time here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose declarations carry such a name writes nothing and names those names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names weighed are the ones the pages carrying ambient types declare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name an interface or a namespace merges under is no such name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is formatted here before it is measured against the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body formatted here is what a page is compared against, so a run is honest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating a version behind the documentation's is stamped again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the line carrying the stamp is written, so the rest of the page is kept.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A page carries an id and a definition no run of this command composes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone this workstation does not carry refuses the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opt-in manifest naming which tokens are kept is in akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
  ],
  name: "declaration",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
