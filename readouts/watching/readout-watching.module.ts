import type { Module } from "@akasha/code/module"

export const readoutWatching = {
  id: "01a08c0f-6f8d-71b1-8b17-155ca606cb6a",
  pageTypeSlug: "module",
  type: "module",
  slug: "readout-watching",
  definition: "the readings taken again as the files those readings are read from change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A watched readout states the folders it reads and the files there it is made from.",
    },
    {
      invariantKind: "departure",
      statement: "The folders the watched readouts read are watched once rather than once each.",
    },
    {
      invariantKind: "departure",
      statement: "A file below a folder a readout reads is no file that readout is made from.",
    },
    {
      invariantKind: "departure",
      statement:
        "A readout read from a file beside its page is taken again when that file changes.",
    },
    {
      invariantKind: "departure",
      statement: "A moved file is answered by the readouts it is made from and by no other.",
    },
    {
      invariantKind: "departure",
      statement: "A readout read from a value in the commit is taken again when the index moves.",
    },
    {
      invariantKind: "departure",
      statement: "A readout says whether it moves with the index rather than naming a file there.",
    },
    {
      invariantKind: "departure",
      statement: "An index event takes every readout moving with the index rather than some.",
    },
    {
      invariantKind: "departure",
      statement: "The index is followed for those events rather than read at each event.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the index is followed at is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A value moving both ways is taken twice, and the later take is the one kept.",
    },
    {
      invariantKind: "departure",
      statement: "One take of every watched readout is made when the watch opens.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a take is asked for is the moment its reading is kept under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A take finding the value the take before found writes nothing and carries nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A take finding no reading writes nothing and carries nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is kept beside the readout that reading was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried to every site the watched readout names.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails is said rather than ending the run.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is carried where no relay secret is stated.",
    },
    {
      invariantKind: "departure",
      statement: "Two takes of one readout never run at once.",
    },
    {
      invariantKind: "departure",
      statement: "Any number of changes arriving while a take runs make one further take.",
    },
    {
      invariantKind: "departure",
      statement: "A take of one readout runs while a take of another readout runs.",
    },
    {
      invariantKind: "departure",
      statement: "A take that throws is said and ends the run.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that cannot be followed is said and the rest are followed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out which folders a readout reads.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a reading out of a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits on a beat.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
  ],
} as const satisfies Module
