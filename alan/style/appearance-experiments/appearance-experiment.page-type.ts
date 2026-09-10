import type { PageType } from "@akasha/pages/page-type"

export const appearanceExperiment = {
  id: "01a06826-794a-7da2-8027-9f143d989e3d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "appearance-experiment",
  definition: "one thing Alan tried wearing and how it read",
  pluralSlug: "appearance-experiments",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/appearance-experiment-day",
    "file-property/eye-read",
    "file-property/felt-read",
    "file-property/what-tried",
    "relation-property/experiment-persona",
    "select-property/appearance-verdict",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/experiment-persona", required: true, many: false },
    {
      pageProperty: "calendar-date-property/appearance-experiment-day",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/appearance-verdict", required: true, many: false },
    { pageProperty: "file-property/what-tried", required: true, many: false },
    { pageProperty: "file-property/eye-read", required: true, many: false },
    { pageProperty: "file-property/felt-read", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An experiment is one thing put on rather than a whole day's dress.",
    },
    {
      invariantKind: "departure",
      statement: "An experiment names the persona who read the experiment rather than Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "How a try read to the persona and how that try landed on Alan are kept as two separate readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "An experiment ends in a verdict of keeping or tweaking or dropping the appearance.",
    },
    {
      invariantKind: "departure",
      statement: "Shaestrel's persona points are counted from these experiments.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each reading is in a file beside the experiment rather than inside the experiment page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
