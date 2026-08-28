---
id: 7149a69d-9eaa-576a-a50a-ba5a310d1e91
page-type-slug: finding
slug: no-csp-violation-is-surfaced-anywhere
title: "No CSP violation is surfaced anywhere"
domain-slug: repo/akasha-repo
---

# Claim

A CSP refusal in any web app reaches the browser console and nothing else, and development serves no CSP at all.

# Evidence

`report-uri`, `report-to` and `Report-Only` match nowhere under `shared/web-security-headers`, so a refusal reaches the browser console and no telemetry. Re-verified 2026-08-28 at `5ad07e0705`.

Development is not a route to noticing one: every app's `dev` script is `react-router dev`, and `getLoadContext` matches nowhere outside this findings store, so the nonce-supplying `server.ts` is not in the dev path and dev serves no CSP.
