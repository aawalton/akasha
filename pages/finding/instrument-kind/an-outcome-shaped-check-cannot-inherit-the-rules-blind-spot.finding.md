---
id: 85d0e615-e522-5cb3-8b35-e257f4a58c21
slug: an-outcome-shaped-check-cannot-inherit-the-rules-blind-spot
page-type-slug: finding
title: "A check shaped like the rule it guards can only be wrong where the rule is wrong; a check shaped like the outcome cannot"
domain-slug: domain/instrument-kind
---

# Claim

A rule-shaped check asks whether the decision was taken correctly; an outcome-shaped one asks whether the result holds. They cost the same and are not equivalent. A rule-shaped check is built from the rule's own reading, so where the rule is inverted, so is the check, and it agrees; and it has a safe direction to hide in, a wrong refusal reading as caution. An outcome-shaped check has neither: it does not know what the rule was, and a wrong refusal lands in the same bucket as a wrong rewrite.

# Evidence

`workspace-package` conversion asked, rule-shaped, whether each package's `exports` map was satisfied by the specifiers naming it, and read a missing `exports` field as an empty whitelist. It reported healthy packages as broken and the repair behind it then created the breakage the false reading had claimed; `finding/agent-harness/absence-read-as-an-answer` binds that fault. The outcome-shaped question — did every specifier that resolved before resolve now — could not have produced that false positive, a package with no `exports` resolving under either reading.

The migration's path check is outcome-shaped: does a path naming a tracked file before still name one after. Over the tree it gives 1,025 resolving before and after, 505 naming nothing tracked, 0 that held before and not after. That rules on both directions at once, and no test of the classification rule was written or needed.

Twice the same night this page's own author landed a change its check had cleared. Removing 143 export-forwarding lines left 55 files at zero bytes and 656 named imports stranded, against a batch report of 143 files cleared. Rebuilt and rerun dry against the proposed tree, the repointing of 7,794 imports read 0 newly unresolved and left 1,923 specifiers naming nothing. Both reverted whole, at `ef3f71d95d` and `90d953dd5f`.

So this claim is bounded by `finding/agent-harness/the-cheap-question-is-the-adjacent-one`: a check inherits no blind spot from the rule and every blind spot of whatever it measures instead. The second instrument asked whether a file stood at a subpath where the question was whether the specifier resolves. Outcome-shaped bought the shape, not the subject.

Not measured: whether the two shapes cost the same to write, asserted from these cases and not timed. An outcome-shaped check needs both states enumerable, and nothing here bounds how often that fails.
