---
id: eaf6641f-982d-5fcb-8c97-33655cb8c116
slug: most-identity-scoped-keys-are-pinned-by-nothing
page-type-slug: finding
title: "Most identity scoped keys are pinned by nothing"
domain-slug: domain/agent-harness
---

# Claim

`IDENTITY_SCOPED_ATTRIBUTE_KEYS` is what a credential rebind nulls so an account row is never observable carrying a new identity beside the previous account's marks, so the list's COMPLETENESS is the mechanism. Nineteen of its twenty-nine entries are named by no assertion in either repository: one dropped from the middle leaks that mark across a rebind and turns nothing red.

# Evidence

Measured 2026-08-13 against `tools/lib/oauth-identity-core.ts` and its carried suite, both standing. Surfaced by the seat that ported the file, which reported it as a hole in the standing suite that crossed with it rather than one the port opened, and confirmed here by driving the list rather than reading it.

The list holds 29 entries, all unique. Ten are named somewhere in `tools/tests/oauth-identity-core.test.ts`. The other nineteen are named by nothing:

`fiveHourStartedAt`, `sevenDayStartedAt`, `burnRateNeeded`, `paceHoursFormatted`, `subscriptionDisabledAt`, `subscriptionDisabledReason`, `subscriptionDisabledBody`, `reenabledAt`, `lastRefreshAt`, `lastRefreshOutcome`, `lastRefreshError`, `terminalAt`, `terminalCode`, `terminalDescription`, `terminalAlertedAt`, `reauthAt`, `lastWindowTriggerAt`, `lastWindowTriggerStatus`, `lastWindowTriggerError`.

What makes those the costly ones is which families they are. `tools/lib/oauth-file-push.ts:157` passes the list as `clearKeys` when and only when the decision is a rebind, with the comment that a rebind's pacing, at-limit and health bookkeeping describes the OUTGOING account. The unpinned nineteen are the whole subscription-disabled family, the whole terminal family, the refresh family and the window-trigger family — the marks that decide whether the picker will hand an account out at all. A newly bound identity inheriting `subscriptionDisabledAt` or `terminalCode` is an account that is silently ineligible for reasons belonging to somebody else.

The suite is not weak where it is aimed: the seat mutated the ported body seven ways and five went red, including dropping ONE key from this list. That kill was on a key the suite names. The nineteen are the ones no mutation could reach.

Not measured: whether the code repository's own `oauth-identity-core.unit.test.ts` names any of the nineteen that the carried suite dropped — the carried suite is the standing suite's assertions, so it should not, but that was not driven.
