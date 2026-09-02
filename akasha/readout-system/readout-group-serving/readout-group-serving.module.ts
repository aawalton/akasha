import type { Module } from "@akasha/code-system/module"

export const readoutGroupServing = {
  id: "01a05f42-92f5-7006-91fc-290b825bc130",
  pageTypeSlug: "module",
  slug: "readout-group-serving",
  definition: "what a route answers when a caller asks for a group of readings as colors",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route serving this answer holds the wiring and no part of the answering.",
    },
    {
      invariantKind: "departure",
      statement: "The group answered for is handed in rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts answered for are the ones whose page names the group.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts are answered in the order the place on each page states.",
    },
    {
      invariantKind: "departure",
      statement: "The label answered is the one the readout's own page carries.",
    },
    {
      invariantKind: "departure",
      statement: "The scale read is the one the readout's page names rather than one named here.",
    },
    {
      invariantKind: "departure",
      statement: "The color answered is the rung the reading reaches on that scale.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading answered is the number carried in written the way the readout states.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page states no format has its reading answered as that number.",
    },
    {
      invariantKind: "departure",
      statement: "The reading carried in is the one taken on the machine that took the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading older than the window is left out rather than colored.",
    },
    {
      invariantKind: "departure",
      statement: "A readout carrying no reading is left out rather than colored black.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page names no label is left out rather than labelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page names no scale is left out rather than colored.",
    },
    {
      invariantKind: "departure",
      statement: "A scale the store withholds leaves its readout out rather than colored.",
    },
    {
      invariantKind: "departure",
      statement: "A group no readout is left in is answered as no reading rather than as empty.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing between here and the tile is allowed to keep an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a scale.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a group.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
} as const satisfies Module
