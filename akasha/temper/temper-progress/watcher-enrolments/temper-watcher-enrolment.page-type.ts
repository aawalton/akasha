import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { TokenCreatedAt } from "./properties/token-created-at.instant-property.ts"
import type { TokenHash } from "./properties/token-hash.text-property.ts"
import type { TokenName } from "./properties/token-name.text-property.ts"

export type TemperWatcherEnrolment = TemperProgressThing & {
  tokenHash: TokenHash
  tokenName: TokenName
  tokenCreatedAt: TokenCreatedAt
}

export const temperWatcherEnrolment = {
  id: "01a05fd3-4364-713f-be23-5bd09e86ad23",
  pageTypeSlug: "page-type",
  slug: "temper-watcher-enrolment",
  definition: "one watcher allowed to carry a machine's saved game files in",
  pluralSlug: "temper-watcher-enrolments",
  extendsSlug: "page-type/temper-progress-thing",
  partSlugs: [
    "instant-property/token-created-at",
    "instant-property/token-last-used-at",
    "text-property/last-run-outcome",
    "text-property/token",
    "text-property/token-hash",
    "text-property/token-name",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "token-hash", required: true, many: false },
    { pagePropertySlug: "token-name", required: true, many: false },
    { pagePropertySlug: "token-created-at", required: true, many: false },
    { pagePropertySlug: "token", required: false, many: false, secret: true },
    { pagePropertySlug: "token-last-used-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "last-run-outcome", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is recognised by the digest rather than by the token being held here.",
    },
    {
      invariantKind: "departure",
      statement: "An enrolment withdrawn is deleted rather than marked withdrawn.",
    },
  ],
} as const satisfies PageType
