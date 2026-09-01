import type { Finding } from "../finding.page-type.ts"

export const aReadingNowTakesItsCoverageWordingFromVerdict = {
  id: "01a05cb7-586b-7002-873f-79be5916db3c",
  pageTypeSlug: "finding",
  domainSlug: "workspace-package/verdict",
  slug: "a-reading-now-takes-its-coverage-wording-from-verdict",
  claim:
    "renderCoverage now stands only in verdict/verdict-text, and health-samples-import reads it from there. That package verdict-reading exists to be a shape that never reads as pass or fail, yet its headline now takes its coverage wording from the verdict package. Wording changed in verdict moves a health reading with it, and nothing in verdict says a reading depends on it.",
  evidence:
    "verdict-text.module.code.ts:18-22 and verdict-reading.module.code.ts:26-30 held byte-identical bodies returning `${observed} of ${declared} ${unit}` or `${observed} ${unit} (denominator not computed)`. The duplication came in with the migration rather than from the old tree: tools/lib/reading-channel.ts:1-7 already imports renderCoverage from ./verdict-channel.ts rather than copying it, so merging restores what stood before. Landed at fb3be57cb3, which adds @akasha/verdict to health-samples-import and leaves verdict depending on nothing. Two things are left standing. verdict-reading still declares its own VerdictCoverage and VerdictFinding interfaces, structurally equal to the ones in verdict-shape, because no-re-export refuses passing a type through and health-import-reading imports VerdictFinding from verdict-reading. And the wording is now one contract across a judgement that is pass or fail and a reading that is defined never to be either, which is a coupling neither page states.",
} as const satisfies Finding
