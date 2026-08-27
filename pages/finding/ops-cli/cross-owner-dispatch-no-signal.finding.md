---
id: a71a10ff-0a39-5961-bcf5-57bfb1ec8a47
page-type-slug: finding
title: "Cross owner dispatch no signal"
domain-slug: domain/ops-cli
---

# Claim

The project CLI has no notion of caller identity -- no verb compares a row's `owner` against who is calling, and `--agent-id` is a caller-supplied, unverified courtesy field -- so a lead can dispatch a live worker onto another lead's row with no signal to either party, the only current protection being a lead manually reading the `owner` field before dispatching.

# Evidence

Project #16411 (someday_maybe, ops-cli). The project CLI has no notion of caller identity: `grep -rlnE "callingAgent|selfAgent|currentAgent|whoami|AGENT_NAME" packages/alanwalton/projects/cli/src/project/` -> zero files. No "me" exists for any verb to compare `owner` against, so an ownership check is not merely absent but unimplementable. Identity where accepted (`ops project claim --seq <n> --agent-id <uuid>`) is caller-supplied, unverified -- a courtesy field, not authentication.

Not defects (checked): cross-owner intake stamping is designed (`add-owner`'s bare form is a pure stamp, #13959); claim refusing only a live holder guards concurrency while keeping cross-owner pickup legitimate (backlog-management doctrine has leads absorbing idle rows) -- an owner-lock would break handoffs. Both first reported to athena as violations, then withdrawn as inferred rather than read.

The actual defect: a lead can dispatch a live worker onto another lead's row and neither party gets any signal -- no surface reflecting ownership back at the dispatcher at decision time, no record left for the owner afterward. The sole protection is a lead reading `owner` by hand first.

Observed instance: a worker was dispatched onto #16336 (owned by athena), unnoticed for roughly an hour, because the seq came from a bare `--seqs` batch query rather than `--owner dalla --dispatchable`. Athena ruled "let it run," so no work was lost, but recovery needed a live judgment call from both leads. #16381 (landed same night) makes `--seqs` plus a filter flag exit 1 instead of discarding silently, but is orthogonal since `--seqs` was passed bare.

Suggested shape (not binding): cross-owner dispatch is an announce, not an ask -- surface the row's owner to the dispatcher at dispatch/claim time when it differs, and leave a durable record on the row. Not owner-locking.

Blocker: the caller-identity gap -- decide whether these verbs should know who is calling, or the signal must live at the dispatch helper.
