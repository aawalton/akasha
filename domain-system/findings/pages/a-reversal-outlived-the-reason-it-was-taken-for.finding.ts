import type { Finding } from "../finding.page-type.ts"

export const aReversalOutlivedTheReasonItWasTakenFor = {
  id: "01a0619b-53b4-7000-8103-b718af589497",
  pageTypeSlug: "finding",
  slug: "a-reversal-outlived-the-reason-it-was-taken-for",
  domainSlug: "domain/alan-harness",
  claim:
    "A reversal can outlive the condition that justified it, with nothing here watching. Two packages were moved out of akasha two minutes apart on 1 September, each because it imported `@shared/pages-query` from inside. One commit that evening removed those imports from both. From then neither reversal had a cause, and both held anyway. The failure is not a wrong decision but a right one whose premise expired unobserved.",
  evidence:
    '`calendar-sync` went into akasha at `ce42d83b2f` and came out at `9e441f2804` and `87cc5e10bd` (11:59), which said: "It reached @shared/pages-query from inside akasha, which imports-inside refuses since 308a810bf0." `location-traces-access` came out at `bc9c7a11e5` and `856b36675f` (12:01) on the same reasoning, worded almost identically.\n\n`18d85f92d3` at 17:05, "ablate keyed writes from the alanwalton page-engine callers", touched both packages and took those imports out of both. From 17:05 neither reversal had its stated cause. calendar-sync is back in akasha tonight at `2f6d78d532` and `829a4a0476`, and nothing about it changed in between beyond that ablation.\n\nNothing joins a reversal to its condition. The reason is prose in a commit message. No check, page or test reads it, so repairing the condition raises nothing, and either was found only by reading old commits on other business.\n\nA survey of the whole history finds exactly two packages that ever left akasha, these two. Two probes agree: of 25 top-level names that departed `akasha/`, 23 are renames remaining inside; and every `.workspace-package.ts` outside akasha at HEAD, asked whether its name ever lived under `akasha/`, returns the same pair.\n\nThe shape is already eroding a hold. A finding removed at `6ddd2941ed` named four imports blocking `temper/player-profile` from akasha. One was repointed at `8578005043`, fifty minutes after the filing, and its evidence still named it. The package has since landed at `5531ceda0a` as `akasha/temper/temper-player-profile`, so the hold did not merely erode; it fell, and nothing measured either.',
} as const satisfies Finding
