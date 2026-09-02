import type { Finding } from "../finding.page-type.ts"

export const threeChecksDoWholeTreeWorkOnAOnePathChange = {
  id: "01a0620a-23b9-77f4-aa7c-e7374fb4b05a",
  pageTypeSlug: "finding",
  slug: "three-checks-do-whole-tree-work-on-a-one-path-change",
  domainSlug: "domain/akasha-check",
  claim:
    "no-rule-in-two-files, declarations-agree and global-declared-once each cost the same whatever the change carries, because each reads the whole tree rather than what it was handed. Over a change of three paths they are 3533 ms of the 4292 ms the assertions in checking's test take. That cost is paid by every patch, and it grows with the tree rather than with the change, so it will keep pushing tests past whatever timeout is set for them.",
  evidence:
    "Measured on 2026-09-02 against the checking module's own test at checking.module.test.ts:305, which runs 34 checks over a SAMPLED of 3 paths. Per check: no-rule-in-two-files 1732 ms over 1 path, declarations-agree 824 ms over 3, global-declared-once 435 ms over 1, no-second-spelling-of-a-name-format 160 ms over 1, imports-inside 129 ms over 1, relation-resolves 69 ms over 2, domain-is-named-by-a-parent 54 ms over 2, property-is-declared-by-a-type 51 ms over 2, and 79 ms across the remaining 26. The first three are 82 percent of the total. Gathering every check with checksIn(ROOT) is 21 ms of the 4313 ms body, so the cost is in the running rather than in the loading. The body read 4.95 s against a 5 s limit before commit f0474f4fbb widened it to 30 s, and 5.4 to 5.8 s in a copied world under swarm load. The whole-tree audit at 04:47 to 04:59 the same morning read 98 refusals over 35086 paths across 41 checks in 713 s, of which no-rule-in-two-files alone answered 79 refusals, so this is the same check dominating both the patch path and the audit path. The mend is to narrow what each of the three reads to what the change reaches, which is what the checks package already asks for at checks.workspace-package.ts:99, that a check runs over the changes the check was given rather than over the pages.",
} as const satisfies Finding
