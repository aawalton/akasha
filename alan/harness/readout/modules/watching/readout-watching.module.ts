import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutWatching = {
  id: "01a08c0f-6f8d-71b1-8b17-155ca606cb6a",
  type: "page-type/module",
  slug: "readout-watching",
  definition: "the readings taken again as the files those readings are read from change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A watched readout states the folders it reads and the files there it is made from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folders the watched readouts read are watched once rather than once each.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file below a folder a readout reads is no file that readout is made from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A readout read from a file beside its page is taken again when that file changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A moved file is answered by the readouts it is made from and by no other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One take of every watched readout is made when the watch opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment a take is asked for is the moment its reading is kept under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A take finding the value the take before found writes nothing and carries nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take finding no reading writes nothing and carries nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is kept beside the readout that reading was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is carried to every site the watched readout names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "How fast a reading falls with the clock is read back off the readout and carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rate carried is the one the take wrote rather than one worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carry that fails is said rather than ending the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is carried where no relay secret is stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two takes of one readout never run at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Any number of changes arriving while a take runs make one further take.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take of one readout runs while a take of another readout runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take that throws is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take that throws ends the run once the takes beside it settle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take that throws costs its own reading rather than the readings beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run ends at the grace where the takes beside a thrown take have not settled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first take to throw is the one the ending is handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A round of takes that all settled leaves the watch saying the round landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A round in which any take threw leaves the watch saying nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readouts that answered nothing are named with the round that landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout whose last take answered a number is not among them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout the watch has taken no time yet is among them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Saying a round landed that itself throws is said rather than ending the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every watched readout is taken again on being asked rather than on a beat here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that cannot be followed is said and the rest are followed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out which folders a readout reads.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a reading out of a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits on a beat.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes what a round that landed leaves published.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges how long a readout may answer nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides a reading held is too old to show.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here follows an index.",
    },
  ],
} as const satisfies Module
