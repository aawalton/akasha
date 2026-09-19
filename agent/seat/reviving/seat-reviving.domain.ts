import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatReviving = {
  id: "01a09c38-82db-7a28-8f18-09c4621a8dce",
  type: "page-type/domain",
  slug: "seat-reviving",
  definition: "a seat put back to work after that seat stopped",
  parts: [
    "module/resume-seat",
    "module/resume-verify",
    "module/seat-coming-back",
    "module/seat-recovery",
    "module/seat-relaunch-target",
    "module/seat-reset",
    "module/seat-resume",
    "module/seat-resume-driver",
    "module/seat-resume-guard",
    "module/seat-resume-help",
    "module/seat-revive-io-verify-decide",
    "module/seat-revive-launch-decide",
    "module/seat-revive-verify-signal",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose pane is dead and whose supervisor is gone is revived from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A supervisor asked to re-exec and gone without a successor leaves a seat to revive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat holding an untaken ask under no live supervisor is told from a seat that is idle.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The ask a seat holds keeps no time of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No seat is revived unless it is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revived seat comes back onto its live tmux session where one holds its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A revived seat with no such session comes back in the mode its row states, or headless.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat whose page went comes back from git history when that seat is resumed by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that comes back that way keeps the id and the session it had.",
    },
  ],
} as const satisfies Domain
