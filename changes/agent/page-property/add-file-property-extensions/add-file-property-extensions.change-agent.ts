import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addFilePropertyExtensions = {
  id: "01a08e26-f9a5-707a-9db0-7a5b52d73384",
  type: "change-agent",
  slug: "add-file-property-extensions",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  definition: "every file property told the endings the files that property has are named with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages acted on are every page property whose value is held in a file.",
    },
    {
      invariantKind: "departure",
      statement: "The endings stated are the ones the type beside that property already names.",
    },
    {
      invariantKind: "departure",
      statement: "A type that is no run of quoted endings is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating its endings already is passed over rather than stating them twice.",
    },
    {
      invariantKind: "departure",
      statement: "The endings are written after the page's definition.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the type those endings make.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
