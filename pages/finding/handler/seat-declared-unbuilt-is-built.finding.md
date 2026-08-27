---
id: 23c0ac73-21ba-5164-9a24-095a9caa5f15
page-type-slug: finding
title: "Seat declared unbuilt is built"
domain-slug: role/handler
---

# Claim

A live docblock in the SMS core says the ki-handler seat "is built later", and the seat is built: it has a spec at `status: "LIVE"`, a live role document and a live task. The quarantined head document said the same thing in nearly the same words, so cross-checking the two returned agreement — the one outcome nobody investigates — and only the spec literal disagreed with both.

# Evidence

Measured 2026-08-08 against `~/code` and `~/instructions`, both on `main`, while emptying `dirty/code/packages-alanwalton-sms-claude.md`.

The docblock. `packages/alanwalton/sms/core/src/sms-identity.ts`, on `KI_HANDLER_TARGET`: "The `ki-handler` seat itself is built later (Ki onboarding 6/6); this module wires the routing decision + the fail-closed boundary."

The seat is built. `packages/agents/routing-core/src/ki-handler-spec.ts:41` declares `KI_HANDLER_SPEC` with `name: "ki-handler"`, one wake source `{ id: "ki-sms-inbound", target: "ki-handler", status: "LIVE" }`, a resume policy, a dormancy policy, `owner: "amy"` and `bootPrompt: "/handler ki"`. `sms-entry-points.ts:77-80` lists it in `SMS_ENTRY_POINT_SPECS`. `packages/agents/supervisor/src/wake-watcher-registry.unit.test.ts:141` asserts the supervisor registry resolves `ki-handler` to that spec.

The bootPrompt resolves. `git ls-files` returns `domains/roles/handler.md` and `domains/tasks/handler/handle-inbound.md`, both live in the instructions repo — the role the spec boots into exists, with a task under it.

Why a record rather than a cut. The quarantined document said "The actual `ki-handler` skill/agent is built later (Ki onboarding 6/6); this path wires the routing decision + the fail-closed boundary" — the same claim in nearly the same words. Checking document against docblock returned agreement, and both were wrong; only the spec literal disagreed. The document is now removed, so the docblock is the last carrier of the false claim and would have outlived the sweep unrecorded.

Not filed here: the `ki-handler-spec.ts` "Bespoke (n=1)" comment whose trigger has been met. `pages/finding/agent-launch/resume-policy-differs-by-door.finding.md` records it already; I opened that file rather than resting on its name. It does not reach this site: `rg -uuu -il "built later|Ki onboarding|KI_HANDLER_TARGET" findings/` and `rg -uuu -il "sms-identity" findings/` both exit 1.

Not measured: whether other modules carry the same sentence.
