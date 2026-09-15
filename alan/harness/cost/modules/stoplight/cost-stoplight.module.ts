import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const costStoplight = {
  id: "01a08baf-2d7b-7409-962f-a47157e07198",
  type: "page-type/module",
  slug: "cost-stoplight",
  definition: "the cost answered as a stoplight, colored with the surplus in hours",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color answered is read from the cost and the surplus together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rule turning the cost and the surplus into a color is the cost color module's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The surplus handed to that rule is the figure in hours rather than a tier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color is worked out without the scale the surplus readout's page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The tier on the surplus carried is read against the scale the surplus readout's page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The surplus readout read beside the cost is the one readout named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost readout names no scale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shared group serving colors no cost readout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readouts answered are the ones whose page names the cost group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readouts are answered in the order the place on each page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The label and the wire key answered are the ones the readout's page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout whose page names no label or no wire key is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout whose page stills the readout is left out rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost with no reading is answered as a stoplight carrying no figure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color of a stoplight with no figure is the color below every rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A cost above nothing carries the whole surplus stoplight its color was read with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The surplus carried is the surplus answered rather than a second reach for the surplus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost of nothing carries no surplus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No wait is worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stoplight carries everything the tile needs to work a wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A wait is divided by the rate the surplus falls at rather than by the cost itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost above nothing means a surplus falling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The block priced is a block the surplus sums.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No stoplight carries a tier above or a fraction climbed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group no readout is left in is answered as no reading rather than as empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store that refuses the group answers as a group holding nothing answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing between here and the tile is allowed to keep an answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is too old.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a person or a device.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cost beside a surplus nothing was read for is black.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus nothing carried is not carried.",
    },
  ],
} as const satisfies Module
