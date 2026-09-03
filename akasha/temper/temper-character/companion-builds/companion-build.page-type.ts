import type { PageType } from "@akasha/pages-system/page-type"
import type { BuildHash } from "../build-versions/properties/build-hash.text-property.ts"
import type { BuildCorrelationId } from "../character-builds/properties/build-correlation-id.text-property.ts"
import type { BuildTargetCount } from "../character-builds/properties/build-target-count.number-property.ts"
import type { BuildVisibility } from "../character-builds/properties/build-visibility.select-property.ts"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { BaseRole } from "./properties/base-roles.select-property.ts"

export type CompanionBuild = TemperCharacterThing & {
  buildHash: BuildHash
  visibility: BuildVisibility
  correlationId?: BuildCorrelationId
  targetCount?: BuildTargetCount
  baseRoles?: readonly BaseRole[]
}

export const companionBuild = {
  id: "01a06835-fae8-7a27-90c7-c499c3e046cc",
  pageTypeSlug: "page-type",
  slug: "companion-build",
  definition: "one saved arrangement of a companion's gear, skills and stats",
  pluralSlug: "companion-builds",
  extendsSlug: "page-type/temper-character-thing",
  partSlugs: ["select-property/base-roles"],
  properties: [
    { pagePropertySlug: "build-hash", required: true, many: false },
    { pagePropertySlug: "visibility", required: true, many: false },
    { pagePropertySlug: "correlation-id", required: false, many: false },
    { pagePropertySlug: "target-count", required: false, many: false },
    { pagePropertySlug: "base-roles", required: false, many: true, max: 2 },
  ],
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
    {
      invariantKind: "departure",
      statement: "A build's name is its title rather than a second field saying the same.",
    },
  ],
} as const satisfies PageType
