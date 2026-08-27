---
id: c6beb893-966b-598d-afa4-c538fa4b8cb3
page-type-slug: finding
title: "Project seq is spelled three ways"
domain-slug: page-type/seat
---

# Claim

One attribute is spelled three ways: project-seq in the domain, projectSeq on the agent row, and seq in the instructions repo's own tool and flag.

# Evidence

`domains/seat.md` names it project-seq in its Design section.

`packages/agents/shared/agent-identity.ts:171-178` carries it as `projectSeq` among the stated axes.

`tools/lib/seat-seq.ts` names it seq throughout, and `tools/seat.ts` takes it as `--seq`.
