import type { Finding } from "../finding.page-type.ts"

export const aMapCoordinateReadsAsALogarithmConstantToTheLinter = {
  id: "01a061b1-a092-7c82-a463-0418f6f14d50",
  pageTypeSlug: "finding",
  slug: "a-map-coordinate-reads-as-a-logarithm-constant-to-the-linter",
  domainSlug: "domain/temper",
  claim:
    "`lint/suspicious/noApproximativeNumericConstant` refuses a data literal that happens to be a prefix of a mathematical constant. `0.434`, one map coordinate among 967 in the skyshards table, was refused as an approximation of `Math.LOG10E`. The value may not change and no rounding avoids the rule, because it matches on the digits as written. Writing the same double as `4.34e-1` lands and is the same number.",
  evidence:
    "The write of `akasha/temper/temper-skyshards` was refused with ``skyshards-part-11.module.code.ts` — `lint/suspicious/noApproximativeNumericConstant` at line 22, column 43 — Prefer constants from the standard library.` The position is in the formatted body rather than the one handed in, which is why a first search of the source found nothing.\n\nThe literal is `reapersmarch__kunasdelve_base: [[0.752, 0.434, 685, 10]]`, carried from `temper/game-collections-addon/src/skyshards/data/part-11.ts:43`. `Math.LOG10E` is `0.4342944819032518`, and `0.434` is a prefix of it. Scanning all 98 staged files for a literal of four or more digits that prefixes one of the eight `Math` constants found this one and no other.\n\nThe pair are the same IEEE double: `4.34e-1 === 0.434` answers true, and the table proof, which evaluates the landed parts and compares them against the upstream ones, still reports 37 zones, 375 maps and 967 placements identical after the change.\n\nA seat carrying any coordinate or measurement table into akasha should scan it for these eight prefixes before the first write rather than meet one refusal at a time.",
} as const satisfies Finding
