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
      statement: "The key carrying the wire key is the one the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming no key for the wire key has the wire key answered under habit.",
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
      statement: "Where each reading is read from is handed in rather than settled here.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in nothing has each reading read from what the relay holds.",
    },
    {
      invariantKind: "departure",
      statement: "A caller wanting the colors without a route asks for the group on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses the group answers as a group holding nothing answers.",
    },
    {
      invariantKind: "departure",
      statement: "Every readout the group admits is answered as a stoplight.",
    },
    {
      invariantKind: "departure",
      statement: "A readout carrying no reading is answered as a stoplight carrying no figure.",
    },
    {
      invariantKind: "departure",
      statement: "A reading older than the window is answered as a stoplight carrying no figure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stoplight carrying no figure names whether no reading was taken or the reading was too old.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of zero is a reading rather than an absence.",
    },
    {
      invariantKind: "departure",
      statement: "The color of a stoplight carrying no figure is the color below every rung.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stoplight carrying no figure carries the figure as empty text rather than leaving it out.",
    },
    {
      invariantKind: "departure",
      statement: "A stoplight carrying no figure carries no tier above and no fraction climbed.",
    },
    {
      invariantKind: "departure",
      statement: "A stoplight carrying a reading says nothing of how that reading is held.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page names no wire key is left out rather than answered keyless.",
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
      statement: "A readout whose page stills the readout is left out rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page states nothing about being stilled is answered.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a readout is stilled is read off the row rather than asked of the store.",
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
