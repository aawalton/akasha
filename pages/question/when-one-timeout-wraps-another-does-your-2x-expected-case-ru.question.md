---
page-type-slug: question
id: 019f9b64-1324-7fbd-8b33-fac12d483ba8
title: "When one timeout wraps another, does your 2x-expected-case rule size the OUTER one — or should the outer be sized from the inner cap, so the inner error always fires first?"
slug: when-one-timeout-wraps-another-does-your-2x-expected-case-ru
status: answered
source-context: "019f9a38-03a1-73f4-b252-5fb1a3b46440"
asked-by: 019f22ad-945f-7a99-8f94-02bc3813d6bc
options:
  - "Outer = inner cap + overhead + margin (diagnosability wins)"
  - "2x-expected governs everywhere; accept the opaque error"
  - "No general rule — size nested timeouts case by case"
answered-at: 2026-07-25T22:43:04.480Z
---
Outer = inner cap + overhead + margin (diagnosability wins)
