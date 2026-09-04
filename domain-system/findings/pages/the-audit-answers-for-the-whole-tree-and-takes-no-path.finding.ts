import type { Finding } from "../finding.page-type.ts"

export const theAuditAnswersForTheWholeTreeAndTakesNoPath = {
  id: "01a06094-4861-7ad5-826b-91303bbe910b",
  pageTypeSlug: "finding",
  slug: "the-audit-answers-for-the-whole-tree-and-takes-no-path",
  domainSlug: "domain/akasha-check",
  claim:
    "The audit runs every check over every file the index names and takes no path, so in a repository fourteen seats commit to it cannot answer whether one change broke anything. Tonight it refused 696 times and every refusal legible in its answer belongs to another domain's migration in flight. What answers per change is the gate on each write, which judged 37 checks against every path landed tonight and refused none.",
  evidence:
    "`akasha audit --help` says `--check narrows which checks run and never which files they see`. There is no path argument. Run over the whole tree it exits 2 with 696 refusals, 29 legible and 667 held back by the 28000 byte answer cap. All 29 are `no-rule-in-two-files` under `akasha/temper/temper-addon-generators` and `akasha/temper/temper-commands`.\n\n`git log --since='2026-09-01 00:00'` counts 4257 commits from 14 committers: Aelwyn, Aine, Akasha, Alan Walton, Amy, Athena, Claude, daily-tracking, Dalla, Ember, error capture, Mari, Ryn and Thea. 183 of those commits touch `akasha/temper/`, which is where every legible refusal sits. 872 touch the folders this seat worked in.\n\nWhat does answer per change is the gate on the write itself. Every landing tonight reported the same line: `37 checks judged the 1 path asked for, and none refused`. It judges the paths asked for, it runs before the commit, and one fault refuses the whole change.\n\nThe call taken: the write gate is the net for this seat's work, and the audit's number is read as a fact about the tree rather than about a change.",
} as const satisfies Finding
