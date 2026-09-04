import type { Finding } from "../finding.page-type.ts"

export const aGrepForTheConstantUndercountsWhatALinterExceptionCovers = {
  id: "01a061b8-8b17-73bc-b931-8a12020a077d",
  pageTypeSlug: "finding",
  slug: "a-grep-for-the-constant-undercounts-what-a-linter-exception-covers",
  domainSlug: "domain/temper",
  claim:
    "How far a linter exception reaches is answered by taking the exception away and running the linter, never by grepping for the value the rule names. A grep over the lorebook tables for eight approximated maths constants answered nine files; taking the three globs out answered twenty-four findings across fifteen files. The number in circulation for the same exception was a hundred and eighteen modules. Three counts, one subject, and only the one the linter gave is a measurement.",
  evidence:
    "`akasha/temper/temper-lorebooks` holds 161 folders. A grep for `0.6931` answered two files; widening it to `0.6931|3.1415|2.7182|1.4426|0.4342|2.3025|1.4142|0.7071` answered nine, none of them under `lorebooks-library-data*`. The linter, run over the same tree with the three akasha globs taken out of the override and put straight back inside one shell call, answered `24 findings in 15 files`, every one `lint/suspicious/noApproximativeNumericConstant`, naming `lorebooks-shalidor-locations-11`, `-14`, `-16`, `-17` and `-18` among others, several files twice. With the globs in place the same run answers `the linter found nothing`. The control that the linter can report at all: `akasha lint --file-path akasha/errors-core` answers three `noShadowRestrictedNames` findings. The whole akasha folder answers four findings, none under temper-lorebooks. One of the three globs, `lorebooks-library-data*/**`, matches seven real folders and excepts nothing today, so it is inert rather than wrong. The wider shape is the one this initiative has met six times already: a census whose subject the tool cannot see reports a small number rather than refusing, and the small number gets quoted.",
} as const satisfies Finding
