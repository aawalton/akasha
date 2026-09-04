import type { Finding } from "../finding.page-type.ts"

export const theHandMaintainedScribingTableHasNotDriftedFromItsGenerator = {
  id: "01a063c4-540f-7dd3-a1cf-2c46a66befed",
  pageTypeSlug: "finding",
  slug: "the-hand-maintained-scribing-table-has-not-drifted-from-its-generator",
  domainSlug: "domain/temper",
  claim:
    "`characters-scribing-source-table` is maintained by hand while the generator that rendered it is still there and uncalled, and the two have not parted. Its 8 sources and 153 tier achievements are what `generateTemperScribingSources` renders today, in the same order. Nothing holds the two equal, so an edit to either parts them with nothing failing.",
  evidence:
    "Measured at 9aeb69b06e. The akasha generator was driven from the 8 `temper-scribing-source` pages and their `tier-achievements` jsonl sidecars, 153 achievement rows read, and what it renders was compared against the landed `SCRIBING_SOURCES` as a whole value with order included: identical, 0 of 8 sources differing, 153 achievements on each side.\n\nThe rendered output reads none of the generator's zone rows, which serve validation alone, so a permissive zone set was supplied and what is compared is the rendered table.\n\nThree seeded faults turn it red: an achievement renamed, one achievement id changed, and a whole source dropped, answering 1, 1 and 8 sources differing.\n\nWhy it can part at all: the call rendering `scribing-sources.generated.ts` was deleted at `0c43aa3a89`, 58 seconds after `d289a6a36f` gave the table a row, as collateral of the `TEMPER_ADDONS_CHARACTERS_GENERATED_DIR` ablation rather than a ruling. The generator is still exported and its input pages are still fetched every run at `addon-data-pages.module.code.ts:209`, and nothing calls it. What TemperCharacters reads is the landed module, so the pages are no longer the one source of this table.\n\nThe cheap guard is a test holding the generator's output equal to the landed module, which is the comparison this finding already ran.",
} as const satisfies Finding
