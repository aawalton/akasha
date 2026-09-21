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
    {
      statement: "No code states the ladder a grade property already states.",
      workingMemory:
        "`alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts` aliases the property's own type and then writes the sixteen rungs out again as `MUSIC_RATINGS`. The page type states that the ladder is the values a property states rather than a second list. 7 files reach `MusicRating`, `MUSIC_RATINGS`, `ratingRung` or `LIKED_RATINGS`.",
    },
  ],
} as const satisfies Initiative
