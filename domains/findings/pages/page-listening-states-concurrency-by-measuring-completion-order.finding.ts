import type { Finding } from "../finding.page-type.ts"

export const pageListeningStatesConcurrencyByMeasuringCompletionOrder = {
  id: "01a05d97-6c09-7000-b36d-9171fc5f32c2",
  pageTypeSlug: "finding",
  slug: "page-listening-states-concurrency-by-measuring-completion-order",
  domainSlug: "workspace-package/pages-system-service",
  claim:
    "`page-listening`'s test for concurrent reads asserts that a narrow question finishes inside the first ten of 21 real HTTP round-trips. That measures completion order under load rather than concurrency. It failed 3 of 4 whole-tree runs on 2026-09-01 and passed 7 of 7 every time it was run alone. The invariant it reaches for is real and is written on the package: a read is answered while another read is being answered.",
  evidence:
    'The test binds `Bun.serve` on loopback, fires 20 questions at page type `module` plus one narrow question at `invariant-kind` keyed to `slug`, awaits all 21, and asserts `order.indexOf("narrow") < 10`.\n\nFour whole-tree `akasha test` runs on 2026-09-01, the tree unchanged between the first two: run 1 failed, `Expected: < 10, Received: 12`, at 3871 pass and 1 fail; run 2 passed at 3872 pass and 0 fail; runs 3 and 4 failed at 3923 pass and 1 fail. Run alone by `--file-path`, the file passed 7 of 7 on every attempt.\n\n`page-listening` starts no process. It reaches `indexes`, `page-value`, `page-serving` and `page-writing`, and none of those runs anything while a read is answered. The verdict moved with what else the machine was doing rather than with any change to those modules, and the assertion carries no ceiling of its own.\n\nWhat it costs is not the red run. An agent meeting a red whole-tree test spends the next run working out whether its own change caused it. This session did exactly that, and withdrew a causal claim about a neighbouring agent before checking the timestamps that showed it false.',
} as const satisfies Finding
