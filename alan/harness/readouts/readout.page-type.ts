import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const readout = {
  id: "01a05446-e760-7cb2-848b-4fcfc7ed45d4",
  type: "page-type",
  slug: "readout",
  definition: "one reading a person is shown",
  pluralSlug: "readouts",
  parts: [
    "boolean-property/readout-enabled",
    "domain/readout-color",
    "domain/readout-figure",
    "domain/stoplight",
    "instant-property/last-value-at",
    "instant-property/went-silent-at",
    "module-property-group/reading",
    "module/readout-asking",
    "module/readout-body",
    "module/readout-credential",
    "module/readout-group-serving",
    "module/readout-none-left",
    "module/readout-reading",
    "module/readout-relay",
    "module/readout-relay-carrying",
    "module/readout-scale-reading",
    "module/readout-serving",
    "module/readout-tier",
    "module/readout-watching",
    "module/widget-tap-counting",
    "module/widget-tap-link",
    "number-property/last-value",
    "number-property/last-value-falls-per-hour",
    "number-property/place",
    "page-type/readout-group",
    "page-type/readout-scale",
    "page-type/readout-widget",
    "relation-property/attribute",
    "relation-property/color-from",
    "relation-property/groups",
    "relation-property/read-live-from",
    "relation-property/scale",
    "select-property/drawn-as",
    "text-property/color-slug",
    "text-property/earned-key",
    "text-property/label",
    "text-property/none-left-emoji",
    "text-property/none-left-words",
    "text-property/unit",
    "text-property/wire-key",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "module-property-group/reading", required: false, many: false },
    { pageProperty: "text-property/label", required: true, many: false },
    { pageProperty: "text-property/unit", required: false, many: false },
    { pageProperty: "number-property/place", required: true, many: false },
    {
      pageProperty: "select-property/drawn-as",
      required: false,
      many: false,
      default: "stoplight",
    },
    { pageProperty: "relation-property/scale", required: false, many: false },
    { pageProperty: "text-property/color-slug", required: false, many: false },
    { pageProperty: "relation-property/color-from", required: false, many: false },
    { pageProperty: "text-property/earned-key", required: false, many: false },
    { pageProperty: "relation-property/attribute", required: false, many: false },
    {
      pageProperty: "relation-property/groups",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/none-left-words", required: false, many: false },
    { pageProperty: "text-property/none-left-emoji", required: false, many: false },
    { pageProperty: "text-property/wire-key", required: true, many: false },
    { pageProperty: "relation-property/read-live-from", required: false, many: false },
    {
      pageProperty: "boolean-property/readout-enabled",
      required: false,
      many: false,
      default: "true",
    },
    {
      pageProperty: "number-property/last-value",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/last-value-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/last-value-falls-per-hour",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/went-silent-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout that takes its own reading holds the code taking it beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "A readout carried its reading from elsewhere holds no code.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names its scale rather than carrying a scale.",
    },
    {
      invariantKind: "departure",
      statement: "A readout names the fact that earns a color rather than naming the color.",
    },
    {
      invariantKind: "departure",
      statement: "Which color is earned belongs to the scale rather than to the readout.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has its label and unit.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has nothing about how the label and unit are drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A readout has one place whatever groups draw the readout.",
    },
    {
      invariantKind: "departure",
      statement:
        "The place a readout has is where that readout sits rather than how wide its figure is.",
    },

    {
      invariantKind: "departure",
      statement: "A readout states whether anything draws the readout.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a readout last took is carried outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "When a readout began answering nothing is carried outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A readout answering nothing keeps the reading it last took.",
    },
    {
      invariantKind: "gap",
      statement: "Everything a readout shows is stated on the readout.",
    },
    {
      invariantKind: "gap",
      statement: "Where and how big is the display's.",
    },
    {
      invariantKind: "departure",
      statement: "A readout keeps the last body the readout was given when its feed stops.",
    },
    {
      invariantKind: "departure",
      statement: "A readout drops that body when the feed refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A row a readout cannot read costs that row's own reading alone.",
    },
    {
      invariantKind: "departure",
      statement: "Readouts refresh on schedules of their own.",
    },
    {
      invariantKind: "departure",
      statement: "Two readouts can disagree about one number at one moment.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's color tracks progress toward done.",
    },
    {
      invariantKind: "departure",
      statement: "A status badge's color tracks kind.",
    },
    {
      invariantKind: "departure",
      statement: "A readout leaves out everything but the reading itself.",
    },
    {
      invariantKind: "departure",
      statement: "A readout draws however many readings its feed sends.",
    },
    {
      invariantKind: "departure",
      statement: "A feed sending no reading is the single feed a readout refuses.",
    },
    {
      invariantKind: "gap",
      statement: "The store answers with numbers.",
    },
    {
      invariantKind: "gap",
      statement: "Every color is worked out outside the store.",
    },
    {
      invariantKind: "gap",
      statement: "A readout is read rather than interrogated.",
    },
    {
      invariantKind: "gap",
      statement: "The reading a readout's reader wants from that readout costs one glance.",
    },
    {
      invariantKind: "gap",
      statement: "A reader sorts nothing to read a readout.",
    },
    {
      invariantKind: "gap",
      statement: "A reader does no arithmetic to read a readout.",
    },
    {
      invariantKind: "gap",
      statement: "A reader recalls nothing to read a readout.",
    },
    {
      invariantKind: "gap",
      statement:
        "A readout's reader is never the instrument that catches that readout being wrong.",
    },
    {
      invariantKind: "gap",
      statement: "Every key a feed sends is decoded by the tile reading that feed.",
    },
    {
      invariantKind: "gap",
      statement: "Every readout a group draws keeps its last reading beside its own page.",
    },
    {
      invariantKind: "gap",
      statement: "Every readout that takes a reading names a group that draws the reading.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Field Retirement",
      act: "Drop a field from a readout before its feed stops sending that field.",
      warrant:
        "A shipped build reads the payload that build was made against, and nothing reports a stranded tile.",
      aids: [
        "Wait for the old build to leave every device.",
        "Treat a rename or an emptied key as a drop.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Device Conditions",
      act: "Draw a readout in its instrument under the conditions the device draws that readout under.",
      warrant:
        "A tile that clips on the phone passes in the instrument's own frame, so a reader finds it first.",
      aids: [
        "Replace the references taken in the old frame.",
        "Match the text size and the dark setting too.",
      ],
    },
  ],
  types: "ts",
} as const satisfies PageType
