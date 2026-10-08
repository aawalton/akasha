import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  type: "page-type/domain",
  slug: "fitness",
  definition: "how Alan trains his body",
  parts: [
    "domain/fitness-coaching",
    "domain/flexibility",
    "domain/strength",
    "page-type/fitness-equipment",
    "page-type/selection-policy",
    "page-type/gym",
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Planned Day",
      act: "Plan the day's whole workout before Alan's first set, for the day's focus and under its pound limit.",
      warrant:
        "Alan carries no decisions in a session, and a workout chosen set by set drifts past the limit.",
      aids: [
        "The pound limit is a ceiling, never a minimum to reach.",
        "Leave warming up and cooling down out of the plan; Alan handles them.",
        "Plan around every movement restriction and coaching note.",
        "Read the limit and what is lifted from `akasha fitness today`.",
        "Change the plan when a set calls for it, without asking Alan.",
        "Log every set as Alan reports it.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "One New Thing",
      act: "Put exactly one movement Alan has never logged into each day's workout, and teach it.",
      warrant: "Alan wants to learn the gym's equipment, and one new movement a day is learnable.",
      aids: [
        "Teach where the equipment is, how to set it up, and the cue that matters most.",
        "Start the new movement light.",
        "Choose it from what the gym Alan is at has.",
      ],
    },
  ],
  updatedAt: "2026-10-08T15:22:43.718Z",
} as const satisfies Domain
