import type { CodeCheck } from "../../code-check.page-type.ts"

export const heldAddonNamesARosterAddon = {
  id: "01a0824c-b5c0-7a41-9d3e-5c8f0b621e74",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "held-addon-names-a-roster-addon",
  definition:
    "the check refusing a `held-addon` page naming an addon the roster finds nowhere or elsewhere",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages judged are the pages the index files under `held-addon`.",
    },
    {
      invariantKind: "departure",
      statement: "The roster is the addon manifest beside each `eso-addon` page the index files.",
    },
    {
      invariantKind: "departure",
      statement: "An addon the index files no addon page for is no addon here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The file a manifest is held in is read from the addon page rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "An addon's name is the name that manifest states.",
    },
    {
      invariantKind: "departure",
      statement: "An addon's folder is the folder its addon page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is read as the change leaves the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming an addon no manifest states is refused as stale.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose addon page sits outside every folder that addon is manifested at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name two folders manifest is reached at either of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index naming `held-addon` pages and no manifest refuses rather than judging every page stale.",
    },
    {
      invariantKind: "absence",
      statement: "A page whose `eso-addon` reaches no addon page is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "An addon no page here names is not refused.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no `held-addon` page judges clean.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is walked, and no path is spelled here.",
    },
  ],
} as const satisfies CodeCheck
