import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const commandSystem = {
  id: "01a04bdd-596d-7df2-832e-b8571f8bf0c6",
  pageTypeSlug: "workspace-package",
  slug: "command-system",
  definition: "what an agent runs by name",
  manifest: "json",
  parts: [
    "module/parse-args",
    "module/answer-bytes",
    "page-type/command",
    "module/calling",
    "module/command-answering",
    "module/command-filling",
    "module/command-declaring",
    "module/landing",
    "module/asking",
    "module/during-call",
    "module/fault-saying",
    "module/gate-building",
    "module/piping",
    "module/reading",
    "module/rooting",
    "module/scratching",
    "module/drafting",
    "module/applying",
    "module/mechanical-landing",
    "module/seat-act-calling",
    "module/edits-landing",
    "module/path-moving",
    "performance/landing-throughput",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command is found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a command costs the same amount however many commands there are.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command answers with the report to make and the refusals that stopped the command.",
    },
    {
      invariantKind: "departure",
      statement: "A command may answer later than that command was called.",
    },
    {
      invariantKind: "departure",
      statement: "A command prints nothing itself.",
    },
    {
      invariantKind: "departure",
      statement: "A command's answer has a code saying whose fault the refusal was.",
    },
    {
      invariantKind: "absence",
      statement: "No command of the old ops CLI remains.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing dispatches an ops command.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command is reached by import or by name rather than by spelling the command's path.",
    },
    {
      invariantKind: "departure",
      statement: "A command has command concerns rather than domain logic.",
    },
    {
      invariantKind: "departure",
      statement: "The logic a command runs is importable without the command.",
    },
  ],
} as const satisfies WorkspacePackage
