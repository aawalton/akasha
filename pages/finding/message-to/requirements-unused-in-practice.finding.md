---
id: 31bac639-cccd-5f79-9aa0-54b5fa7b766d
slug: requirements-unused-in-practice
page-type-slug: finding
title: "Requirements unused in practice"
domain-slug: page-property-definition/message-to
---

# Claim

Of the requirements a message can state about its recipient, nothing in the system states a role, and one site alone states a domain. Almost every send instead names a seat, which is a frozen guess at the domain and role that seat happens to hold.

# Evidence

An audit of roughly thirty send sites across both repositories found no caller addressing a role at all.

One arm of one site resolves a domain at send time: `resolveDomainLeadOrDefault("agent-harness", "athena")` at `tools/lib/kill-alert-send.ts:54`, reading persona rows filtered on their domain attribute. Its sibling in the same file, `sendAgentKillAlertBatch`, uses the literal `HARNESS_LEAD_NAME = "athena"` instead, so one condition has two send paths and only one looks anything up.

Everything else names a seat: `ops seat send --to`, `ops seat record --name`, `ops seat gate-block --holder`, the wake-watcher's `spec.name`, and literals such as `TARGET_AGENT_NAME = "aranya"` at `packages/agents/infra-alert-bridge/src/messenger.ts:47`, `"dalla"` at `packages/agents/devops-monitor/src/operator.ts:8`, and `EMAIL_WORKER_HANDLER ?? "amy-alan-handler"` at `tools/email-watch.ts:8`.

A seat's name spells its persona, domain and role, so naming a seat states those three as they stood when the caller was written, and the persona among them is the component that does not vary across the several seats one persona holds.
