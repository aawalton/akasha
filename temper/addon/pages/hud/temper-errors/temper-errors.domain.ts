import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperErrors = {
  id: "01a0c6ff-0f87-7747-920a-288d24e2f233",
  type: "page-type/domain",
  slug: "temper-errors",
  definition: "every Lua error the game raises, written into saved variables",
  parts: [
    "module/errors-addon-build-ids",
    "module/errors-addon-entry",
    "module/errors-addon-hooks",
    "module/errors-addon-limits",
    "module/errors-addon-record",
    "module/errors-addon-traceback",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An error raised before the add-on loads is recorded once loading finishes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two errors sharing one callstack are kept as one entry under a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error is blamed on the add-on folder its callstack names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the recorded errors back.",
    },
  ],
} as const satisfies Domain
