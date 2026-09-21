import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueGradeNaming = {
  id: "01a0c52c-c916-79a8-b395-6f7e7335ddcb",
  type: "page-type/initiative",
  slug: "nimue-grade-naming",
  domain: "domain/naming",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "One page states the grade ladder, what each rung is called, and each rung's color.",
      workingMemory:
        "The ladder is written out in full in five places: the three rank properties `rank`, `grade` and `singability`, `MUSIC_RATINGS` in `rating-ladder.module.code.ts`, and `LITRPG_RATINGS` in `reading-shapes.module.code.ts`. No rung carries a color anywhere, and a select property states its values as plain text and nothing else. `rank-property.page-type.ts` decides that a rank property states the whole ladder as its values, so restating it is required today, and that decision is what changes.",
    },
  ],
} as const satisfies Initiative
