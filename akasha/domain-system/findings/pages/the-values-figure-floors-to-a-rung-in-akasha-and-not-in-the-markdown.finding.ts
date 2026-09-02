import type { Finding } from "../finding.page-type.ts"

export const theValuesFigureFloorsToARungInAkashaAndNotInTheMarkdown = {
  id: "01a0641a-d59a-7b83-b2c3-b043dbb2e6ad",
  pageTypeSlug: "finding",
  slug: "the-values-figure-floors-to-a-rung-in-akasha-and-not-in-the-markdown",
  domainSlug: "workspace-package/readout-system",
  claim:
    "Two engines state opposite rules for how a value's figure is reached. The markdown group says a value's figure sums its personas' raw units, flooring none of them to a rung first. All six akasha values readouts say a persona day counts at the rung the day reached rather than at the day's own units. This is not a gap but a contradiction, and deleting the markdown settles it silently. It wants settling before anything is deleted.",
  evidence:
    'Measured 2026-09-02 by reading both declarations rather than running either.\n\nMarkdown, `readouts/group/values.readout-group.md` under Design: "Every value runs the same multiplier ladder, and only its one-times baseline differs." and "A value\'s figure sums its personas\' raw units, flooring none of them to a rung first."\n\nakasha, `akasha/readout-system/readouts/pages/faith/faith.readout.ts:22-27`: "The reading totals the rungs the day\'s persona days reached for this value." and "A persona day counts at the rung the day reached rather than at the day\'s own units." The same pair is written on love, health, learn, fun and wealth, so all six agree with each other and disagree with the markdown.\n\nNeither markdown statement is anywhere in akasha: grep for `multiplier ladder`, `one-times` and `flooring` over every `.ts` and `.tsx` under `akasha/` returns zero files each.\n\nA gap is a fact on one side and absence on the other. Here both sides assert, and they assert opposites, so whichever tree goes first decides the rule with nobody reading the decision. `values` is also the denominator a persona\'s day is scored against, per `the-scored-count-is-fifteen-and-three-group-pages-name-no-members`, so the answer moves a number Alan sees rather than only a display.\n\nBoth rules cannot have been true of the same reading, so one engine has been wrong for as long as both engines have been there.',
} as const satisfies Finding
