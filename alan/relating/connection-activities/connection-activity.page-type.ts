import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ConnectionActivityAttn } from "./properties/connection-activity-attn.number-property.ts"
import type { ConnectionActivityAttractiveness } from "./properties/connection-activity-attractiveness.number-property.ts"
import type { ConnectionActivityCategory } from "./properties/connection-activity-category.select-property.ts"
import type { ConnectionActivityEnergy } from "./properties/connection-activity-energy.number-property.ts"
import type { ConnectionActivityFemininity } from "./properties/connection-activity-femininity.number-property.ts"
import type { ConnectionActivityFitness } from "./properties/connection-activity-fitness.number-property.ts"
import type { ConnectionActivityIdent } from "./properties/connection-activity-ident.number-property.ts"
import type { ConnectionActivityIntensity } from "./properties/connection-activity-intensity.number-property.ts"
import type { ConnectionActivityKindness } from "./properties/connection-activity-kindness.number-property.ts"
import type { ConnectionActivityMaturity } from "./properties/connection-activity-maturity.number-property.ts"
import type { ConnectionActivityModality } from "./properties/connection-activity-modality.select-property.ts"
import type { ConnectionActivityModelBasis } from "./properties/connection-activity-model-basis.select-property.ts"
import type { ConnectionActivityNovelty } from "./properties/connection-activity-novelty.number-property.ts"
import type { ConnectionActivityPositivity } from "./properties/connection-activity-positivity.number-property.ts"
import type { ConnectionActivityReality } from "./properties/connection-activity-reality.select-property.ts"
import type { ConnectionActivityRepeatable } from "./properties/connection-activity-repeatable.boolean-property.ts"
import type { ConnectionActivitySafety } from "./properties/connection-activity-safety.select-property.ts"
import type { ConnectionActivitySeq } from "./properties/connection-activity-seq.number-property.ts"
import type { ConnectionActivityWeight } from "./properties/connection-activity-weight.number-property.ts"
import type { ConnectionActivityWit } from "./properties/connection-activity-wit.number-property.ts"

export type ConnectionActivity = Page & {
  title: Title
  connectionActivityAttn: ConnectionActivityAttn
  connectionActivityAttractiveness: ConnectionActivityAttractiveness
  connectionActivityCategory: ConnectionActivityCategory
  connectionActivityEnergy: ConnectionActivityEnergy
  connectionActivityFemininity: ConnectionActivityFemininity
  connectionActivityFitness: ConnectionActivityFitness
  connectionActivityIdent: ConnectionActivityIdent
  connectionActivityIntensity: ConnectionActivityIntensity
  connectionActivityKindness: ConnectionActivityKindness
  connectionActivityMaturity: ConnectionActivityMaturity
  connectionActivityModality: readonly ConnectionActivityModality[]
  connectionActivityModelBasis: ConnectionActivityModelBasis
  connectionActivityNovelty: ConnectionActivityNovelty
  connectionActivityPositivity: ConnectionActivityPositivity
  connectionActivityReality: ConnectionActivityReality
  connectionActivityRepeatable: ConnectionActivityRepeatable
  connectionActivitySafety: ConnectionActivitySafety
  connectionActivityWeight: ConnectionActivityWeight
  connectionActivityWit: ConnectionActivityWit
  connectionActivitySeq: ConnectionActivitySeq
}

export const connectionActivity = {
  id: "01a0658e-c30d-7f83-bcba-db0766dbd484",
  pageTypeSlug: "page-type",
  slug: "connection-activity",
  definition: "one way Alan spends time with someone, and what an hour of it is worth to him",
  pluralSlug: "connection-activities",
  extends: ["page-type/page"],
  partSlugs: [
    "boolean-property/connection-activity-repeatable",
    "number-property/connection-activity-attn",
    "number-property/connection-activity-attractiveness",
    "number-property/connection-activity-energy",
    "number-property/connection-activity-femininity",
    "number-property/connection-activity-fitness",
    "number-property/connection-activity-ident",
    "number-property/connection-activity-intensity",
    "number-property/connection-activity-kindness",
    "number-property/connection-activity-maturity",
    "number-property/connection-activity-novelty",
    "number-property/connection-activity-positivity",
    "number-property/connection-activity-seq",
    "number-property/connection-activity-weight",
    "number-property/connection-activity-wit",
    "select-property/connection-activity-category",
    "select-property/connection-activity-modality",
    "select-property/connection-activity-model-basis",
    "select-property/connection-activity-reality",
    "select-property/connection-activity-safety",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "number-property/connection-activity-attn", required: true, many: false },
    {
      pagePropertySlug: "number-property/connection-activity-attractiveness",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "select-property/connection-activity-category",
      required: true,
      many: false,
    },
    { pagePropertySlug: "number-property/connection-activity-energy", required: true, many: false },
    {
      pagePropertySlug: "number-property/connection-activity-femininity",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "number-property/connection-activity-fitness",
      required: true,
      many: false,
    },
    { pagePropertySlug: "number-property/connection-activity-ident", required: true, many: false },
    {
      pagePropertySlug: "number-property/connection-activity-intensity",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "number-property/connection-activity-kindness",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "number-property/connection-activity-maturity",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "select-property/connection-activity-modality",
      required: true,
      many: true,
      maxCount: null,
    },
    {
      pagePropertySlug: "select-property/connection-activity-model-basis",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "number-property/connection-activity-novelty",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "number-property/connection-activity-positivity",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "select-property/connection-activity-reality",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "boolean-property/connection-activity-repeatable",
      required: true,
      many: false,
    },
    { pagePropertySlug: "select-property/connection-activity-safety", required: true, many: false },
    { pagePropertySlug: "number-property/connection-activity-weight", required: true, many: false },
    { pagePropertySlug: "number-property/connection-activity-wit", required: true, many: false },
    { pagePropertySlug: "number-property/connection-activity-seq", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every rating is a multiplier against an ordinary hour.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two activities differing only in how those activities reach Alan are rated apart.",
    },
    {
      invariantKind: "departure",
      statement: "Every rating is on a quarter-step scale from a quarter to two.",
    },
    {
      invariantKind: "absence",
      statement: "The number ordering the activities is no rating.",
    },
    {
      invariantKind: "departure",
      statement: "The multiplier is the fourteen ratings multiplied together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Reality counts a whole for authentic and a half for professional and a quarter for celebrity.",
    },
    {
      invariantKind: "departure",
      statement:
        "Safety counts a quarter at L3 and a half at L4 and three quarters at L5 and a whole at L6.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds a half for presence.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds a quarter for audio.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.15 for digital presence.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.15 for text.",
    },
    {
      invariantKind: "departure",
      statement: "Modality adds 0.1 for image.",
    },
    {
      invariantKind: "departure",
      statement:
        "An hour of an activity meets the multiplier over thirty-two of his connection need.",
    },
    {
      invariantKind: "departure",
      statement: "It is parasocial where the other person is not authentic.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing worked out from the ratings is stored.",
    },
  ],
} as const satisfies PageType
