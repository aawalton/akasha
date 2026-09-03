import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"

export type CompanionBuild = TemperCharacterThing

export const companionBuild = {
  id: "01a06835-fae8-7a27-90c7-c499c3e046cc",
  pageTypeSlug: "page-type",
  slug: "companion-build",
  definition: "one saved arrangement of a companion's gear, skills and stats",
  pluralSlug: "companion-builds",
  extendsSlug: "page-type/temper-character-thing",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is the arrangement itself rather than the companion wearing it.",
    },
    {
      invariantKind: "departure",
      statement: "One companion holds many builds, and one build is shared across companions.",
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
