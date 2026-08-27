---
id: 8f2463f9-982f-5c66-a85a-ac5eea4aac04
slug: messages-written-outside-send
page-type-slug: finding
title: "Messages written outside send"
domain-slug: domain/agent-harness
---

# Claim

`ops seat outbound-wake` reads a seat's outbound traffic and calls that reading complete on the grounds that `ops seat send` is the sole writer to `public.messages`. Other writers exist, so a seat that sent by one of them reads as having sent nothing.

# Evidence

The claim stands at `tools/commands/seat/outbound-wake.ts:51-52`: "`ops seat send` is the sole writer and every outbound is a row".

Three other writers were found by reading. `tools/lib/agent-record.ts:72-77` performs a raw INSERT, reached from `tools/email-watch.ts:39`. `tools/lib/kill-alert-send.ts:30,65` writes on both its send paths. `tools/lib/supervisor-limit-resume.ts:51` writes the limit-resume nudge.

The reading is used to decide whether a wake is owed, so the consequence is a seat judged to have sent nothing when it sent through one of these.
