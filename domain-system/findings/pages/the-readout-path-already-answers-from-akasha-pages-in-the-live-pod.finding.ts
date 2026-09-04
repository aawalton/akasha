import type { Finding } from "../finding.page-type.ts"

export const theReadoutPathAlreadyAnswersFromAkashaPagesInTheLivePod = {
  id: "01a05e49-17e2-7149-b108-f71da1f1875d",
  pageTypeSlug: "finding",
  slug: "the-readout-path-already-answers-from-akasha-pages-in-the-live-pod",
  domainSlug: "domain/alan-harness",
  claim:
    "The categorization tile already draws its scale and its none-left words from the akasha readout pages, and the markdown readouts answer nothing; an earlier finding of mine asserting the opposite was wrong and is removed.",
  evidence:
    'Measured inside `alanwalton/web` against the running pod. `standsHere("readout")` and `standsHere("readout-scale")` both answer false, so the pod does not resolve readouts from the checkout it carries; the question goes to the store. `readBacklogCountScale()` answers `{orangeAt:11,redAt:21,blackAt:31,yellowAt:1}`. `readNoneLeft("monarch-unreviewed-transactions")` answers `{words:"All reviewed!",emoji:"🎉"}`. `readNoneLeft("unreviewed")`, the markdown slug, answers `{}`.\n\nSo the akasha slug is the one that resolves and the markdown slug is the one that misses. The readout reading path already reads akasha pages alone, which is the state Alan asked for, reached before anyone asked.\n\nTwo things I had inferred and stated are false. That `readouts/readout/readout.page-type.md` makes `reaches()` answer true for a pod: it does not, as measured. And that a query built with a `page-type` key is refused by the store: the internal type spells it that way, but what reaches the wire resolves, since these calls answer.\n\nThe hard-coded slugs are still worth removing, and `RingScale` still belongs outside the one readout that declares it. But neither is a defect the tile is suffering from, and the repair is not urgent for the widget.',
} as const satisfies Finding
