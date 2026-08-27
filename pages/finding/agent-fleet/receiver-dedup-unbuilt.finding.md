---
id: 1a5ab2c6-79ee-508e-b9d0-2a0acea18bf5
page-type-slug: finding
title: "Receiver dedup unbuilt"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/main-pipeline-alert/src/messenger.ts` closes its docblock with "at-least-once delivery (the receiver dedups by `pipeline_seq`)", and no receiver dedups by `pipeline_seq` — nothing anywhere parses the `main-pipeline-failure` envelope. Dalla IS woken, by a `wakeSources` rule on her row matching the sender tag, so the alert lands and is read as text; what does not exist is the dedup the comment names. That comment is the whole of the worker's argument that a duplicate alert is benign.

# Evidence

Measured 2026-08-07 against `~/code` at `47a2a573e45a469061c65aaa2db522a65fa473d4`.

`messenger.ts:28-29` — " * on the next pulse — at-least-once delivery (the receiver dedups by" / " * `pipeline_seq`)." `manifest.ts:18` states the delivery class without the clause.

The named receiver is the persona `dalla` (`pipeline-owner-target.ts:55`, `FALLBACK_PERSONA_HANDLE = "dalla"`). A persona's operative conduct is a `public.pages` row, so I read the row: `ops page show 019f22ad-945f-7a99-8f94-02bc3813d6bc --properties conduct`. 7,652 bytes, and a case-insensitive search for `pipeline_seq`, `main-pipeline`, `dedup` and `at-least-once` returned nothing. `ops persona roster` lists her live, `status` and `retiredAt` both empty.

The envelope reaches nobody else. `rg -l "main-pipeline-failure"` over `~/code` returns two files, `envelope.ts` and `decide.ts`, both inside the sending package. `rg -uuu -l` for it over `~/instructions` returns only the quarantined head document and git's own logs.

Owner-aware routing widens it: `manifest.ts` resolves per event through `resolveAlertTargetForPipeline`, so a single-owner batch routes to that project's owning persona instead. A dedup on one persona's conduct would not cover the lane.

Delivery itself is armed: `ops page list --type persona --properties wakeSources --json` shows her row carrying `{"id":"dalla-main-pipeline-alert","status":"LIVE","target":"dalla","senderMatch":"system:main-pipeline-alert"}`. That rule matches on `messages.source`, never on the envelope's `kind`, so it wakes her without anything parsing the payload.

NOT measured: how often the crash-in-window fires, which needs the subscriber's error history rather than the current reading.

Found while ingesting `dirty/code/packages-agents-main-pipeline-alert-claude.md`, whose `## Delivery semantics` block carried the same clause and was cut on it; the clause in live source stays.

Distinct from `code-harness/alert-lane-parks-on-retired-recipient.md` and `agent-fleet/system-source-write-stamp.md`; neither touches the dedup claim.
