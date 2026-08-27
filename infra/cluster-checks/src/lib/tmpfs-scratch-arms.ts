import type { Population } from "../../../../../instructions/tools/lib/check-workflow/population"
import { renderBound, renderShortfall } from "../../../../../instructions/tools/lib/check-workflow/population-bound"

export function removalArm(): readonly string[] {
  return [
    "REMOVAL ARM — UNMEASURED",
    "  Nothing above is a claim about whether a scratch tree is RELEASED. That is a runtime",
    "  property and this lane is blind to it, not weak at it: no static scan distinguishes an",
    "  `afterEach` that removes a tree from one that assigns a variable, which is exactly how a",
    "  pair of suites leaking thousands of trees passed every review — their location was right,",
    "  so the leak did no damage and produced no signal.",
    "  Measuring it means running each suite against an empty scratch root and counting what",
    "  survives. Until that is wired in, this arm has no population and reports none.",
  ]
}

export function shellArm(args: {
  readonly population: Population
  readonly spelling: number
}): readonly string[] {
  return [
    `NOT EVALUATED: ${args.spelling} shell file(s) spell a tmpfs root and none was judged ${renderBound(args.population)}.`,
    "  A script's execution host is not decidable from its text — the same `mktemp` is compliant",
    "  in a CI pod and a violation on the workstation — so they were opened to be counted and",
    "  judged not at all. Nothing above is a claim about any of them.",
    ...renderShortfall(args.population, "  "),
  ]
}
