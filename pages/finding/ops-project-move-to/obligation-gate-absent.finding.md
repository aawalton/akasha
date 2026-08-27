---
id: 5d21b353-eb21-5608-a10c-8fdaf91bb303
slug: obligation-gate-absent
page-type-slug: finding
title: "Obligation gate absent"
domain-slug: domain/global
---

# Claim

`ops project move-to` enforces no obligation gate, while `ops project update` still names one in a live refusal message, so a caller is told a check exists that nothing performs.

# Evidence

Measured 2026-08-17, from a delegate's report while removing the code repo's copy of an unrelated send refusal.

`tools/lib/project-handoff-enforce.ts:40` is the whole of what `move-to` enforces: `enforceHandoffGates` walks `gatesTraversedBy` and dispatches on `handoffGateKind`, which yields `worker`, `manager`, `lead` and the Alan gate. No branch reaches an obligation. `tools/commands/project/move-to.ts:9` imports that function and nothing else gate-shaped, and neither that file nor `tools/lib/project-move-to-code.ts` contains the string `obligation`.

`tools/commands/project/update.ts:222` refuses a `status` key inside `--properties-file` on the grounds that forwarding it "would put a plain property write through move-to's adjacency rule, handoff gates, obligation ledger, transfer record and return notice unasked". Four of those five are real. The obligation ledger is not.

Across `tools/`, `obligation` appears in `lib/verdict-coverage.config.json`, `commands/agent/blocked-census.ts`, `commands/project/sibling-dep-census.ts` and `commands/project/update.ts` — a census that reports and a message that claims, with nothing that refuses.

In the code repo, `packages/alanwalton/projects/cli/src/project/move-to-obligation-gate.integration.test.ts` held 19 tests over this gate, 10 of them failing because `move-to` exits 0 where they expect a refusal. Verified failing identically on a clean checkout of `main` at HEAD, so this is not local drift. Those tests are being deleted rather than fixed, on the ruling that a check on a harness command belongs in the instructions repository — which is why this record exists separately from them.

Not measured: whether the gate ever ran in the ported path, or was lost when `move-to` moved into the instructions repo. Git history was not walked. Whether the gate should exist at all is a decision nobody has made here.
