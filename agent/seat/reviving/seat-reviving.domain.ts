import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatReviving = {
  id: "01a09c38-82db-7a28-8f18-09c4621a8dce",
  type: "domain",
  slug: "seat-reviving",
  definition: "a seat put back to work after that seat stopped",
  parts: [
    "module/resume-seat",
    "module/resume-verify",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose pane is dead and whose supervisor is gone is revived from here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor asked to re-exec and gone without a successor leaves a seat to revive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat holding an untaken ask under no live supervisor is told from a seat that is idle.",
    },
    {
      invariantKind: "constraint",
      statement: "The ask a seat holds keeps no time of its own.",
    },
    {
      invariantKind: "gap",
      statement: "Something reads which seats hold an untaken ask under no live supervisor.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seat found that way is revived rather than left with a pane held open and no process.",
    },
    {
      invariantKind: "departure",
      statement: "A revived seat comes back onto its live tmux session where one holds its name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A revived seat with no such session comes back in the mode its row states, or headless.",
    },
  ],
} as const satisfies Domain
