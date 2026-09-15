import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const heldAddonNamesARosterAddon = {
  id: "01a0824c-b5c0-7a41-9d3e-5c8f0b621e74",
  type: "page-type/check-code",
  slug: "held-addon-names-a-roster-addon",
  definition:
    "the check refusing a `held-addon` page naming an addon the roster finds nowhere or elsewhere",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages judged are the pages the index files under `held-addon`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The roster is the addon manifest beside each `eso-addon` page the index files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon the index files no addon page for is no addon here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The file a manifest is held in is read from the addon page rather than written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon's name is the name that manifest states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon's folder is the folder its addon page sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest is read as the change leaves the manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming an addon no manifest states is refused as stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page whose addon page sits outside every folder that addon is manifested at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name two folders manifest is reached at either folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An index naming `held-addon` pages and no manifest refuses rather than judging every page stale.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page whose `eso-addon` reaches no addon page is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An addon no page here names is not refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An index naming no `held-addon` page judges clean.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder is walked here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No path is spelled here.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
