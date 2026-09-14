import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addFile = {
  id: "01a07813-6e3b-77c3-9c1e-b0c5778fd31b",
  type: "change-agent",
  slug: "add-file",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one body written at one path, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is handed in whole rather than as a passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body that body was composed against may be handed in beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body handed in that is not the body there refuses the change unwritten.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A caller handing none in writes over whatever the path holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Writing the body is left to the partial this change runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index files a page this change writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A later act in the same change names a page this change wrote.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
