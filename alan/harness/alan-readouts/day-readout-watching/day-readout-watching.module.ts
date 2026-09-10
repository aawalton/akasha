import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayReadoutWatching = {
  id: "01a08c11-e71f-7f8f-b343-d87bac283b1c",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-readout-watching",
  definition: "the readouts read off Alan's opened day, taken again as that day's files change",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every readout here is read off the folder the opened day is kept in.",
    },
    {
      invariantKind: "departure",
      statement: "A readout states which of that folder's three files the readout is made from.",
    },
    {
      invariantKind: "departure",
      statement: "A readout read off the open block is made from the stretches file alone.",
    },
    {
      invariantKind: "departure",
      statement: "A readout read off the day row is made from the day file and the file beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A readout read off the day row moves with the day values too.",
    },
    {
      invariantKind: "departure",
      statement: "The day row is in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The index says the day row has moved.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is beside its day rather than in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The stretches file says a stretch has moved.",
    },
    {
      invariantKind: "departure",
      statement: "The safety and the cost read the open block alone and move with no values.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus is made from the stretches too.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus fall rate turns as a stretch opens.",
    },
    {
      invariantKind: "departure",
      statement: "The constitution counts food entries and moves with the food entry values.",
    },
    {
      invariantKind: "stopgap",
      statement: "The food entry page type is spelled here rather than asked of its reader.",
    },
    {
      invariantKind: "departure",
      statement: "The reading each readout takes is the one its own reading module takes.",
    },
    {
      invariantKind: "departure",
      statement: "Readouts one read answers together share that read rather than each making one.",
    },
    {
      invariantKind: "departure",
      statement: "The sites a reading is carried to are named here rather than held as a secret.",
    },
    {
      invariantKind: "departure",
      statement: "The folder followed is worked out again whenever the opened day rolls.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the day folders sit in is followed for a day folder appearing.",
    },
    {
      invariantKind: "departure",
      statement: "The watch is renewed at the instant the opened day ends.",
    },
    {
      invariantKind: "departure",
      statement: "A renewal takes every reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A day folder that was not there when the watch opened is followed once it is.",
    },
    {
      invariantKind: "constraint",
      statement: "The timers taking these readings run whatever the watch does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here dispatches a change to a readout.",
    },
    {
      invariantKind: "absence",
      statement: "No readout here is taken on a beat.",
    },
  ],
} as const satisfies Module
