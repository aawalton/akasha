import type { Finding } from "../finding.page-type.ts"

export const aKeyedFoldRestatedInTwoFilesWasNotRefusedByNoRuleInTwoFiles = {
  id: "01a06301-0e13-7041-8e27-1c3519167938",
  pageTypeSlug: "finding",
  slug: "a-keyed-fold-restated-in-two-files-was-not-refused-by-no-rule-in-two-files",
  domainSlug: "domain/temper",
  claim:
    "`no-rule-in-two-files` did not refuse a keyed fold written out a second time in a second file. Two swarm agents each wrote the same eight-line fold over `Object.entries` into `temper-characters-addon`, four minutes apart, and both writes were taken. Neither agent was warned, so landing first gave no protection and landing second gave no signal. A seat that leans on this check to find its duplicates will carry them.",
  evidence:
    "Measured 2026-09-02. At `f2dfca27fc` (10:22:59) `characters-collector-merge` landed holding `mergeIdListsByKey` and `mergeMaxByKey`. At `713cf8309a` (10:32:27) `characters-keyed-merge` landed holding `mergeByKey`. All three write the same body: return `fresh` where `stored` is missing, copy `stored` into a fresh record under `Number(key)`, then go over `fresh` and take the entry already there or fold the two. They differ only in what the fold is — a list union, a maximum, or a parameter. Both landings reported checks judged and none refused. The two files were both in the tree from 10:32:27 until `0ceaf3abec` (10:36:41), when the agent that wrote the first noticed by eye and made it delegate to the second. The same-file pair is outside what this check rules on, which is two files; the cross-file pair is inside it. Twenty-seven refusals from this check elsewhere in the migration say it does fire, so this is a false negative rather than a check that never runs.",
} as const satisfies Finding
