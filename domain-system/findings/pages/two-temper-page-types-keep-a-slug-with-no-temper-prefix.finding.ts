import type { Finding } from "../finding.page-type.ts"

export const twoTemperPageTypesKeepASlugWithNoTemperPrefix = {
  id: "01a06835-fae8-7072-97d0-8f0bc891ee00",
  pageTypeSlug: "finding",
  slug: "two-temper-page-types-keep-a-slug-with-no-temper-prefix",
  domainSlug: "domain/temper",
  claim:
    "Every page type Temper carries is slugged temper- except two, and the exception is deliberate. akasha's pages-access holds a named allowlist of exactly character-build and companion-build, so the Temper title prefix reaches page types whose slug does not announce the domain. A worker migrating either one reads the 119-to-0 prefix convention and renames it temper-character-build. That rename strands the allowlist, both page-query pages, and every call site in temper-web and temper-watcher.",
  evidence:
    'Measured on 2026-09-03. akasha/pages-system/pages-access/domain-title-prefix/domain-title-prefix.module.code.ts declares `TEMPER_UNPREFIXED_SLUGS` as a two-element set holding "character-build" and "companion-build", and `isTemperDomainSlug` answers true for a slug starting temper- or present in that set. It is live: akasha/pages-system/pages-access/page-type/page-type.module.code.ts:39 calls `validateTemperTitlePrefix` on every page type created through the access layer. The convention it carves out is otherwise total, `find akasha/temper -name \'*.page-type.ts\'` giving 119 slugs and zero of them lacking the prefix. The un-prefixed pair is named as a string literal at 17 sites across 10 files, among them asksOfSlug on both akasha/pages-system/page-queries/pages/character-build-all.page-query.ts and companion-build-all.page-query.ts, `pageTypeSlug: "character-build"` in the version-history-dialog patch, and exported page-type constants in temper-watcher\'s watcher-settings-equipment and watcher-export-companion-builds. The contrast that dates the carve-out: account-character was renamed to temper-account-character and its readers repointed, leaving `pageTypeSlug: "account-character"` at zero occurrences, while the build pair kept its un-prefixed readers untouched. The two page types were minted un-prefixed on this evidence.',
} as const satisfies Finding
