---
id: 0ed13863-5daa-5dd7-ab9f-4323b27f286f
slug: domain-key-unbound-to-a-standing-domain
page-type-slug: finding
title: "Domain key unbound to a standing domain"
domain-slug: page-type/finding
---

# Claim

Nothing checks that a finding's `domain:` names a domain that stands, so a finding filed against a domain later renamed or retired keeps a key nothing resolves, and the domain's owner never meets it again.

# Evidence

`tools/checks/findings-sorted.ts` compares the folder against the `domain:` key and reports where they disagree. It never asks whether the slug they agree on is declared anywhere. Both write verbs do ask — `tools/file-finding.ts` and `tools/rehome-finding.ts` each refuse a `--domain` that no document declares as a `domain-slug:` — so the only moment the tie is tested is the moment the finding lands.

Measured on 2026-08-15: renaming `domains/ops.md` to `domains/ops-cli.md` left 70 findings under `findings/ops/`, every one keyed `domain: ops`, and `findings-sorted` passed over all of them. Nothing in the rename reported them, and `review-findings` run by the owner of `ops-cli` would have found none of them. They were moved by hand, one `ops memory rehome-finding` call each, after the drift was noticed rather than after it was reported.

A second instance, far larger, measured 2026-08-28 at `48a6a7171d`: the migration into akasha on 2026-08-27 landed 715 findings in 93 folders naming documents that did not survive it, `code-check`, `code-harness`, `infra`, `instructions-harness`, `tests` and `readouts` holding 441 of them. Here the unresolvable name is the folder rather than the key: each declares `domain-slug: domain/global`, so `findings-sorted` reports them misfiled rather than passing over them. Writing the folder into the key would make this finding's fault true 715 times over, and `ops finding rehome` refuses it on those grounds.
