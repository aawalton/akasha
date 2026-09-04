import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const readoutSystem = {
  id: "01a05446-e75c-73a6-9442-0919b16723c0",
  pageTypeSlug: "workspace-package",
  slug: "readout-system",
  definition: "how a reading reaches the person it is for",
  manifest: "json",
  partSlugs: [
    "page-type/readout",
    "page-type/readout-group",
    "page-type/readout-scale",
    "page-type/readout-widget",
    "page-type/value",
    "module/readout-answering",
    "module/readout-asking",
    "module/readout-body",
    "module/readout-group-serving",
    "module/readout-serving",
    "module/readout-credential",
    "module/readout-none-left",
    "module/readout-reading",
    "module/readout-relay",
    "module/readout-ring",
    "module/readout-scale-reading",
    "module/readout-tier",
    "module/readout-unread",
    "stylesheet/readout-look",
    "domain/readout-color",
    "domain/readout-figure",
    "domain/ring",
    "domain/stoplight",
  ],
  invariants: [
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
      statement: "A feed sending no reading is the one feed a readout refuses.",
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
      statement: "What a readout's reader wants from that readout costs one glance.",
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
} as const satisfies WorkspacePackage
