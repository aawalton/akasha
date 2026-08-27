---
id: d0bed74b-8d5c-5a97-afb6-210bd33f4cb4
slug: shell-signout-path-missing
page-type-slug: finding
title: "Shell signout path missing"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The alanwalton Capacitor native shell has no verified working sign-out path: the footer POSTs to `/sign-out`, a declared server-route divergence that is not registered in the shell's route table, and the only client-observable sign-out signal fires only after Supabase has already cleared localStorage, so any authenticated cleanup action on sign-out would 401.

# Evidence

Filed as project #15945 (domain alanwalton-ios). Discovered by the #15933 worker while building the sign-out revoke path — pre-existing, deliberately kept out of that slice's scope.

The defect: `app-shell.tsx`'s footer POSTs a native form to `/sign-out`. `/sign-out` is a declared SERVER_ROUTE divergence (`app-capacitor-parity.divergences.ts:98`) and is not registered in `app-capacitor/routes.ts`, so inside the Capacitor shell that POST targets a route absent from the shell's route table.

Second observation: the only client-observable sign-out signal (`auth-provider.tsx:248`, `wasAuthenticated -> user == null`) fires after Supabase has already cleared localStorage, so `apiFetch` has no Bearer at that point — any authenticated cleanup POST on sign-out 401s, a wall any future feature hitting this hook would meet.

Not verified: the above is a code reading only; nobody observed the shell's sign-out button actually fail on device/sim. A fallback could handle it. Recommended first step: tap sign-out in the shell (sim or TestFlight) and observe. A 2026-07-25T06:28 scope note (athena) established this needs no human — runnable via the iOS sim + Appium harness already up for #15933, or Playwright MCP against the deployed web app for a web baseline. The row needs only a priority slot from Alan, not his hands.

Scope boundary: #15933 correctly does not fix this — its device-secret path clears Keychain first then best-effort revokes (safe regardless; failed revoke degrades to a harmless orphan hash that self-corrects on next mint's upsert, per aelwyn). Surfaced to Alan rather than self-dispatched: unrelated to the #15859 active-energy chain athena was holding while a worker was in flight.
