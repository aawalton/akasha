---
id: 713637ed-5586-51f7-ba6a-544733daa1fd
page-type-slug: finding
title: "One family two spellings"
domain-slug: domain/code-quality
---

# Claim

Twenty-five test files sit as flat hyphenated siblings of a directory bearing their own stem, so one subject is spelled two ways in the same folder — `pod-spec-callbacks.unit.test.ts` beside `pod-spec/`, `agent-liveness-decide.unit.test.ts` beside `agent-liveness/`.

# Evidence

Measured in the #19315 worktree at the point six of seven children had committed. For every `*.unit.test.ts`, `*.property.test.ts` and `*.integration.test.ts` in the repository, tested whether any hyphen-prefix of its basename names a sibling directory. Twenty-five match.

Most of the twenty-five stand beside directories #19315 created while bringing files under the character ceiling: `agent-liveness/`, `object-store/`, `liveness-census/`, `off-workstation-roots/`, `test-classification/`, `tick-budget/`. The second spelling was introduced by that work rather than inherited, and the pre-existing convention in those folders was the flat hyphenated sibling throughout — `pod-spec-env.ts`, `pod-spec-labels.ts`, `pod-spec-entrypoint.ts` and nine more sit flat beside the new `pod-spec/`.

The directory was the right call and was ruled on rather than drifted into: `Domain Directory` is instruction and a local file-naming habit is not, and the initiative the work served named the directory too. What is left is that instruction and habit disagree in about six folders, visible as one family answering to two spellings.

Not measured: whether the flat siblings would read better inside the directories that now stand beside them, or whether some of those directories should not have been made. Converting them is a rename, and the subject groupings hold either way, so nothing is at risk while this stands undecided.

Raised by the developer on #19321 rather than found by a sweep, which is the reason it is a finding and not a defect: it asked whether the tree should read the other way rather than deciding alone.
