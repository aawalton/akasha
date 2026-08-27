---
id: fe507e75-7bcf-5122-8ddf-724c8e7bd684
slug: sms-sender-flip-gated
page-type-slug: finding
title: "Sms sender flip gated"
domain-slug: domain/alan-harness-agents
---

# Claim

Flipping the SMS outbound sender from Alan's personal number to Amy's dedicated toll-free line is a single-value SOPS config swap, ready to dispatch as soon as the Telnyx toll-free A2P verification for +18445122550 clears, and as of the last update the ~/.secrets.env half of the swap was already live while the tracked-SOPS-source half remained outstanding.

# Evidence

Project #13822 (domain: alan-harness-agents, status: someday_maybe, live-on: deploy). Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Capture from Alan's settled intent (relayed 019f0d75), someday/maybe sibling of #13821 under the Ki umbrella #13713. Notes name Initiative: admin.

SCOPE: once Amy's carrier A2P approval clears, flip the SMS outbound sender from Alan's number +16085122510 to Amy's dedicated line +18445122550 — a config swap of the same SOPS source value #13821 created (TELNYX_FROM_NUMBER), plus re-source into ~/.secrets.env. No code change.

GATE at settling: someday_maybe, gated on the external A2P approval event. UN-PARK TRIGGER: approval clears → exploration for dispatch. DEPENDS ON #13821 (tracked SOPS source must exist first).

WHY SEPARATE from #13821: distinct gate/time — #13821 is do-now (Alan accepts interim carrier-filter risk); this flip waits on an external approval. Folding would hold #13821 open on a dependency it doesn't need. Principles cited: IaC, Flow.

History:
- 2026-07-01: parent link dropped (aine-intake-alan, Alan-directed) — detached from its umbrella (closed done) so it no longer holds the parent open; stands alone as deferred backlog.
- 2026-07-01: REVIEWED → KEEP someday_maybe (aine-intake-alan, Alan-directed; Alan affirmed "legit as a keep"). Genuinely gated on the external A2P event, a tracked wait not limbo.
- 2026-07-02: requestingAgent stamped (provenance backfill, aine 019f23a1). Ownership: amy — un-park tail of her active SMS/toll-free compliance engagement. Status: ~/.secrets.env half already live (flipped 2026-07-01); tracked-SOPS-source half (#13821, done) still needs the swap for reproducibility (IaC). Gate refined: A2P event = Telnyx toll-free verification request e7d8be0f-17bc-59e5-b10d-3797208f0557, resubmitted 2026-07-02 14:54Z, defects cured, then Waiting For Telnyx.

Not actively worked.
