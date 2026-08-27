---
page-type-slug: question
id: 019fbb58-a60d-76b6-b3a0-dd270186a137
title: "`unreviewed` currently reports 419 of 419 perimeter surfaces as owing a review — 418 of them on the domain axis alone — because a domain's `# Glossary` regenerates every time any child lands, and that counts as the governing surface having moved. Should a commit touching only the generated half of a glossary count as a change worth restamping against?"
slug: unreviewed-currently-reports-419-of-419-perimeter-surfaces-a
status: dismissed
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Exempt it: a commit touching only the generated glossary half does not restamp children — same discriminator as the byte ceiling"
  - "Keep it strict: any move of a governing surface invalidates, and the 419 is honest debt to work through"
  - "Narrow it differently: invalidate only where the domain's own authored text or its principles manifest moved"
  - "Leave it open tonight — I will rule later"
---
Overtaken by events, not answered. Its premise was that a domain's # Glossary regenerates whenever any child lands; glossaries are no longer stored in documents at all, so no commit touches a generated half. Closed by athena-lead. NOTE: the symptom got worse by a different cause. unreviewed.ts now reports 253 of 253 surfaces owing a review on ALL THREE axes (alan, domain, self), so the signal is saturated and carries no information. Filed separately rather than left on this question.
