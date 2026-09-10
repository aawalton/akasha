import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const migrateCheckLogs = {
  id: "01a08bf8-a9a2-7db0-ac29-7bc7478c7dd6",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "migrate-check-logs",
  changeMode: "change-mode-add",
  definition: "each run a check recorded since a day, written into the log of the group that ran",
  code: "ts",
  test: "ts",
  temporary: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every check whose runs are read is read from the index rather than from a list.",
    },
    {
      invariantKind: "departure",
      statement: "The day a run belongs to is the day that run opened.",
    },
    {
      invariantKind: "departure",
      statement: "A run before the day handed in is left where that run was recorded.",
    },
    {
      invariantKind: "departure",
      statement: "A run recorded at audit is written into the audit group's log.",
    },
    {
      invariantKind: "departure",
      statement: "Every other run is written into the check group's log.",
    },
    {
      invariantKind: "departure",
      statement: "The phase a line names is kept as that line spelled it.",
    },
    {
      invariantKind: "departure",
      statement: "A line already in a log is read from the disk rather than from the change.",
    },
    {
      invariantKind: "departure",
      statement: "A log already holding a line takes that line no second time.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are written in the order the runs opened.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is no run recorded as one object refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "Writing each body is left to the mechanical change adding a file of any kind.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a run out of where that run was recorded.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is meant to stay.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
