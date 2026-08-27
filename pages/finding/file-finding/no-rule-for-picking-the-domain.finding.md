---
id: d4c18b56-65d1-5268-9248-0c2a31425c88
slug: no-rule-for-picking-the-domain
page-type-slug: finding
title: "No rule for picking the domain"
domain-slug: task/file-finding
---

# Claim

`file-finding` never says how to pick the domain a finding is filed against, and a wrong choice lands silently. `ops finding create` refuses a `--domain` no document declares, so only an unreal domain is caught; a real-but-wrong one is written and pushed. That the miss is live rather than hypothetical is written into `review-findings` stage 1, which carries a `Re-home` bullet for "the one whose claim plainly names ground you do not hold" — a repair path built for a mistake that keeps recurring.

# Evidence

Raised by the review-instructions seat on `pages/task/file-finding.task.md`, which added no bullet: picking the domain rests on judgment, and this task sends an addition resting on judgment back rather than into the document.

I can corroborate the gap from having run the task. This pass has filed 84 findings, and the domain for each was chosen by judgment against the phrase "the domain that owns the ground it names" in `review-documents`. Nothing checked any of those choices. Two I chose between plausible candidates with no criterion to part them — a check's false positive filed under `jargon` rather than under the tooling domain, and a boot-closure gap filed under `domain` rather than under `lead`. Either could be a re-home later.

`ops finding create --help` states the domain is validated against akasha, which is the refusal that catches an unreal slug and nothing else.

Not measured: how many findings in the 661 already standing sit under the wrong domain.
