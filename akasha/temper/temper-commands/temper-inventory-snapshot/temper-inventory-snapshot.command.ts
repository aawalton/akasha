import type { Command } from "@akasha/command-system/command"

export const temperInventorySnapshot = {
  id: "01a0603c-c1d9-7ef8-acb9-f19095076d6e",
  pageTypeSlug: "command",
  slug: "temper-inventory-snapshot",
  definition: "the command joining a stored holdings snapshot back into one whole record",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<snapshot-id>", takes: "the snapshot joined back together" },
    { said: "--latest", takes: "take the newest snapshot on the account rather than one named" },
    { said: "--out <path>", takes: "the file the record is written to" },
    { said: "--json", takes: "give the record on one line rather than indented" },
  ],
  helpNotes: [
    "a snapshot is kept as a header and a run of chunks, and the chunks are joined in the order the header names.",
    "a snapshot is named or `--latest` is said, never both.",
    "`--latest` orders by when the data was taken rather than by when the snapshot was written.",
    "a snapshot holding no chunk refuses the call rather than giving back an empty record.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A snapshot is kept as a header and a run of chunks.",
    },
    {
      invariantKind: "departure",
      statement: "The chunks are joined in the order the header names.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a snapshot and asking for the newest at once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The newest snapshot is the one whose data is most recent.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot holding no chunk refuses the call.",
    },
  ],
} as const satisfies Command
