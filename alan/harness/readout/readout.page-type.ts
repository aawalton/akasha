import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const readout = {
  id: "01a05446-e760-7cb2-848b-4fcfc7ed45d4",
  type: "page-type/page-type",
  slug: "readout",
  definition: "a reading a person is shown",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "readout" },
    { partOfSpeech: "part-of-speech/noun", spelling: "readouts" },
  ],
  pluralSlug: "readouts",
  parts: [
    "boolean-property/readout-enabled",
    "domain/readout-color",
    "domain/readout-figure",
    "domain/stoplight",
    "instant-property/last-value-at",
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
    "multi-relation-property/groups",
    "relation-property/read-live-from",
    "relation-property/scale",
    "select-property/drawn-as",
    "text-property/label",
    "text-property/none-left-emoji",
    "text-property/none-left-words",
    "text-property/unit",
    "text-property/wire-key",
    "relation-property/readout-color",
    "select-property/counted-on",
    "relation-property/counted-from",
    "text-property/count-name",
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
    { pageProperty: "relation-property/color-from", required: false, many: false },
    { pageProperty: "relation-property/attribute", required: false, many: false },
    {
      pageProperty: "multi-relation-property/groups",
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
    { pageProperty: "relation-property/readout-color", required: false, many: false },
    { pageProperty: "select-property/counted-on", required: false, many: false },
    { pageProperty: "relation-property/counted-from", required: false, many: false },
    { pageProperty: "text-property/count-name", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout that takes its own reading holds the code taking it beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout carried its reading from elsewhere holds no code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout names its scale rather than carrying a scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout has its label and unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout has nothing about how the label and unit are drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout has one place whatever groups draw the readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The place a readout has is where that readout sits rather than how wide its figure is.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A readout states whether anything draws the readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading a readout last took is carried outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout answering nothing keeps the reading it last took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The label and the unit a tile draws for a readout are stated on the readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every feed sends each readout's label, and the unit where one is stated, beside its reading.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every word a countdown draws for a readout is stated on the readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How big a readout is drawn is the display's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout keeps the last body the readout was given when its feed stops.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout drops that body when the feed refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row a readout cannot read costs that row's own reading alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Readouts refresh on schedules of their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two readouts can disagree about one number at one moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's color tracks progress toward done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status badge's color tracks kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout leaves out everything but the reading itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout draws however many readings its feed sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feed sending no reading is the single feed a readout refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store answers with numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every color is worked out outside the store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout is read rather than interrogated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading a readout's reader wants from that readout costs one glance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader sorts nothing to read a readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader does no arithmetic to read a readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader recalls nothing to read a readout.",
    },

    {
      decisionKind: "decision-kind/gap",
      statement: "Every key a feed sends is decoded by the tile reading that feed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every readout a group draws keeps its last reading beside its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every readout that takes a reading names a group that draws the reading.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A readout nothing can be read for shows no signal rather than a zero.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
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
      directiveKind: "directive-kind/rule",
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
  schema: "jsonl",
} as const satisfies PageType
