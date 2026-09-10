import type { Module } from "@akasha/code/module"

export const costStoplight = {
  id: "01a08baf-2d7b-7409-962f-a47157e07198",
  pageTypeSlug: "module",
  type: "module",
  slug: "cost-stoplight",
  definition: "the cost answered as a stoplight, colored with the tier the surplus reaches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The color answered is read from the cost and the surplus together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rule turning the cost and the surplus into a color is the cost color module's.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tier the surplus reaches is read against the scale the surplus readout's page names.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus readout read beside the cost is the one readout named here.",
    },
    {
      invariantKind: "departure",
      statement: "A cost readout names no scale.",
    },
    {
      invariantKind: "departure",
      statement: "The shared group serving colors no cost readout.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts answered are the ones whose page names the cost group.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts are answered in the order the place on each page states.",
    },
    {
      invariantKind: "departure",
      statement: "The label and the wire key answered are the ones the readout's page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page names no label or no wire key is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A readout whose page stills the readout is left out rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A cost with no reading is answered as a stoplight carrying no figure.",
    },
    {
      invariantKind: "departure",
      statement: "A cost older than the window is answered as a stoplight carrying no figure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stoplight with no figure names whether no reading was taken or the reading was too old.",
    },
    {
      invariantKind: "departure",
      statement: "The color of a stoplight with no figure is the color below every rung.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus missing or too old colors the cost as a black surplus colors it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cost above nothing carries the whole surplus stoplight its color was read with.",
    },
    {
      invariantKind: "departure",
      statement:
        "The surplus carried is the surplus answered rather than a second reach for the surplus.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of nothing carries no surplus.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus missing or too old is not carried.",
    },
    {
      invariantKind: "departure",
      statement: "No wait is worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "The stoplight carries everything the tile needs to work a wait.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wait is divided by the rate the surplus falls at rather than by the cost itself.",
    },
    {
      invariantKind: "departure",
      statement: "A cost above nothing means a surplus falling.",
    },
    {
      invariantKind: "departure",
      statement: "The block priced is a block the surplus sums.",
    },
    {
      invariantKind: "departure",
      statement: "No stoplight carries a tier above or a fraction climbed.",
    },
    {
      invariantKind: "departure",
      statement: "A group no readout is left in is answered as no reading rather than as empty.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses the group answers as a group holding nothing answers.",
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
      statement: "Nothing here decides when a reading is too old.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
} as const satisfies Module
