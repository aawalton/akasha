import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueGradeNaming = {
  id: "01a0c52c-c916-79a8-b395-6f7e7335ddcb",
  type: "page-type/initiative",
  slug: "nimue-grade-naming",
  domain: "domain/naming",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "Every property marking how good a thing is is named `grade`.",
      workingMemory:
        "Four names for one ladder of sixteen rungs: `rank` at `alan/collection/properties/rank.rank-property.ts`, declared on `collection` and carried by 10 pages; `grade` at `persona/anchor-image/properties/grade.rank-property.ts`, carried by 1; `--rating` at `command/argument/pages/rating.argument.ts`, whose own text calls it a grade; and `MusicRating` in `rating-ladder.module.code.ts`. A slug is unique to its page type, so `rank` cannot be renamed onto the `grade` already there.",
    },
    {
      statement: "The page type for a rung on the ladder is `grade-property`.",
      workingMemory:
        "`page/rank-property/rank-property.page-type.ts` defines itself as `a page property with a rung on a ladder of grades`, and its decisions say a rung above another rung is a better grade. The type already uses in its own words the name it does not carry. 12 files name `rank-property` or `RankProperty`.",
    },
    {
      statement: "No code states the ladder a grade property already states.",
      workingMemory:
        "`alan/music/choosing/modules/rating-ladder/rating-ladder.module.code.ts` aliases the property's own type and then writes the sixteen rungs out again as `MUSIC_RATINGS`. The page type states that the ladder is the values a property states rather than a second list. 7 files reach `MusicRating`, `MUSIC_RATINGS`, `ratingRung` or `LIKED_RATINGS`.",
    },
    {
      statement: "Every command taking a rung on the ladder says `--grade`.",
      workingMemory:
        "`command/argument/pages/rating.argument.ts` says `--rating` and takes the grade, a rung on the ladder from `F` up to `S+`, so the flag disagrees with its own description. 4 files name `--rating` or `argument/rating`.",
    },
    {
      statement:
        "One page states the grade ladder, what each rung is called, and each rung's color.",
      workingMemory:
        "The ladder is written out in full in five places: the three rank properties `rank`, `grade` and `singability`, `MUSIC_RATINGS` in `rating-ladder.module.code.ts`, and `LITRPG_RATINGS` in `reading-shapes.module.code.ts`. No rung carries a color anywhere, and a select property states its values as plain text and nothing else. `rank-property.page-type.ts` decides that a rank property states the whole ladder as its values, so restating it is required today, and that decision is what changes.",
    },
  ],
} as const satisfies Initiative
