import type { PageType } from "@akasha/pages-system/page-type"
import type { BuildHash } from "../build-versions/properties/build-hash.text-property.ts"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { BuildCorrelationId } from "./properties/build-correlation-id.text-property.ts"
import type { BuildTargetCount } from "./properties/build-target-count.number-property.ts"
import type { BuildVisibility } from "./properties/build-visibility.select-property.ts"

export type CharacterBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
}

export const characterBuild = {
  id: "01a06835-fae8-7243-8c39-219aa5e07daf",
  pageTypeSlug: "page-type",
  slug: "character-build",
  definition: "one saved arrangement of a character's gear, skills and stats",
  pluralSlug: "character-builds",
  extendsSlug: "page-type/temper-character-thing",
  partSlugs: [
    "number-property/build-target-count",
    "select-property/build-visibility",
    "text-property/build-correlation-id",
  ],
  properties: [
    { pagePropertySlug: "build-hash", required: true, many: false },
    { pagePropertySlug: "visibility", required: true, many: false },
    { pagePropertySlug: "correlation-id", required: false, many: false },
    { pagePropertySlug: "target-count", required: false, many: false },
  ],
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
    {
      invariantKind: "departure",
      statement: "A build's name is its title rather than a second field saying the same.",
    },
  ],
} as const satisfies PageType
