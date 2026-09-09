import type { Module } from "@akasha/code/module"

export const prosePattern = {
  id: "01a08220-6498-71cb-af30-b73f6642f5fe",
  pageTypeSlug: "module",
  type: "module",
  slug: "prose-pattern",
  definition: "where a construction is in a sentence, read off that sentence's tree",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A construction is found in the tree rather than in the words.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word read as a noun with neither a clause nor an object names no action of that word.",
    },
    {
      invariantKind: "departure",
      statement: "A word read as a noun that has an object of its own is read as an action.",
    },
    {
      invariantKind: "departure",
      statement: "A word whose object comes before it has an object.",
    },
    {
      invariantKind: "departure",
      statement: "A word taking a particle is left alone, because the particle sets the sense.",
    },
    {
      invariantKind: "departure",
      statement: "A word bound to something by `to` and with no object is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Which spellings are one word is the caller's to say.",
    },
    {
      invariantKind: "departure",
      statement: "A word in the passive that puts a thing somewhere is the same construction.",
    },
    {
      invariantKind: "departure",
      statement: "A `to` phrase names no place, so it binds the word rather than placing a thing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose only subject is the relativizer has no object anywhere, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose object is the relativizer and that has no subject of its own is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A bare adverb after a word is a particle, whatever the parser calls it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word a person or an unknown is the holder of is another sense, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word a preposition stands before names an act, so it describes no thing before it.",
    },
    {
      invariantKind: "departure",
      statement: "A word whose object before it is a pronoun names no thing, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word a past participle comes right after is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A past participle is a word read as a verb and spelled with a trailing `ed` or `en`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A particle right after a word is that word's particle, whatever the parser calls it.",
    },
    {
      invariantKind: "departure",
      statement: "A particle the parser hung on a word's object is that word's particle.",
    },
    {
      invariantKind: "departure",
      statement:
        "A particle right after a word's object is that word's particle unless the particle marks a phrase.",
    },
    {
      invariantKind: "departure",
      statement: "A `to` phrase the parser hung on a word's object binds that word.",
    },
    {
      invariantKind: "departure",
      statement: "A directed preposition binds a word as `to` does.",
    },
    {
      invariantKind: "departure",
      statement: "A word a form of `have` comes right after is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word the parser gave a form of `have` for an auxiliary is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word set against another word by `rather than` is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A preposition the parser hung on a word as an adverb strands that word, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word whose object is a self is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose object a preposition hangs off sends that object on, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A directed preposition after a word's object sends that object on.",
    },
    {
      invariantKind: "departure",
      statement: "A participle an adverb comes before is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A participle beside another clause on the same word is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A participle either side of a joining is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A participle read as a clause of its own names an act, so it describes no thing.",
    },
    {
      invariantKind: "departure",
      statement: "A word with no object that places a thing somewhere is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word read as a noun that heads a relative clause is read as an action.",
    },
    {
      invariantKind: "departure",
      statement: "A thing right before a word with no subject of its own is that word's subject.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose object is a question answers rather than holds, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word the parser gave two objects a name could fill is misread, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose object is read as neither a thing nor a pronoun is misread, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A fronted word joined to another word is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A word spelled with a trailing `ing` is a participle, whatever it hangs on.",
    },
    {
      invariantKind: "departure",
      statement: "A participle under a form of `be` names an act, so it describes no thing.",
    },
    {
      invariantKind: "departure",
      statement: "A participle with no word before it names an act, so it describes no thing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A participle read as a clause's own subject names an act, so it describes no thing.",
    },
  ],
} as const satisfies Module
