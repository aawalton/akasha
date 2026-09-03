import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"

export type CharacterBuild = TemperCharacterThing

export const characterBuild = {
  id: "01a06835-fae8-7243-8c39-219aa5e07daf",
  pageTypeSlug: "page-type",
  slug: "character-build",
  definition: "one saved arrangement of a character's gear, skills and stats",
  pluralSlug: "character-builds",
  extendsSlug: "page-type/temper-character-thing",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is the arrangement itself rather than the character wearing it.",
    },
    {
      invariantKind: "departure",
      statement: "One character holds many builds, and one build is shared across characters.",
    },
    {
      invariantKind: "departure",
      statement: "Two builds arranged alike carry one hash.",
    },
    {
      invariantKind: "departure",
      statement: "A name is author-given, so several builds answer to the same name.",
    },
    {
      invariantKind: "constraint",
      statement: "A build's hash runs longer than a name is allowed to run.",
    },
    {
      invariantKind: "departure",
      statement: "This page type is Temper's while its slug carries no temper- prefix.",
    },
  ],
} as const satisfies PageType
