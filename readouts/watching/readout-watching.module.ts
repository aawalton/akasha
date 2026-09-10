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
      statement: "A readout names the page types it reads a value in the commit from.",
    },
    {
      invariantKind: "departure",
      statement: "A readout naming no page type reads nothing in the commit and moves with none.",
    },
    {
      invariantKind: "departure",
      statement: "The file a page type's values are in is followed rather than the whole index.",
    },
    {
      invariantKind: "departure",
      statement: "That file moving is answered by the readouts naming that page type and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A value file is followed rather than read at each event.",
    },
    {
      invariantKind: "departure",
      statement: "Where the values of a page type are is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A value moving both ways is taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "The later take is the one kept.",
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
      statement:
        "How fast a reading falls with the clock is read back off the readout and carried.",
    },
    {
      invariantKind: "departure",
      statement: "The rate carried is the one the take wrote rather than one worked out here.",
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
      statement: "A take that throws is said, and ends the run once the takes beside it settle.",
    },
    {
      invariantKind: "departure",
      statement: "A take that throws costs its own reading rather than the readings beside it.",
    },
    {
      invariantKind: "departure",
      statement: "The run ends at the grace where the takes beside a thrown take have not settled.",
    },
    {
      invariantKind: "departure",
      statement: "The first take to throw is the one the ending is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A round of takes that all settled leaves the watch saying the round landed.",
    },
    {
      invariantKind: "departure",
      statement: "A round in which any take threw leaves the watch saying nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts that answered nothing are named with the round that landed.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose last take answered a number is not among them.",
    },
    {
      invariantKind: "departure",
      statement: "A readout the watch has taken no time yet is among them.",
    },
    {
      invariantKind: "departure",
      statement: "Saying a round landed that itself throws is said rather than ending the run.",
    },
    {
      invariantKind: "departure",
      statement: "Every watched readout is taken again on being asked rather than on a beat here.",
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
      statement: "Nothing here writes what a round that landed leaves published.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges how long a readout may answer nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
  ],
} as const satisfies Module
