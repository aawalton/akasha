---
id: b8077bb9-10cb-5fa7-a263-9a05db16bd4d
slug: browser-tests-reach-production
page-type-slug: finding
title: "Browser tests reach production"
domain-slug: web-app/alanwalton-web
---

# Claim

`bun test` in `packages/alanwalton/web` drives a real browser against DEPLOYED `alanwalton.com` rather than against the tree under test, so a package test run reaches production.

# Evidence

Observed on 2026-08-10 while running package checks for #18343, which touched that package's readout gate and nothing a browser test covers.

`packages/shared/browser-test-harness/src/console-capture.ts:13` records the mechanism in its own words: `BROWSER_TEST_URL` defaulted to the DEPLOYED app. A full `bun test` in `packages/alanwalton/web` reported `[browser target] tests run against https://alanwalton.com (DEPLOYED)`.

Two properties of that run, either of which is enough to act on:

The suite cannot answer for the tree it is run in. 1218 passed and 31 failed across `*.browser.test.ts` — reader-pager, detail-layout-gate, reader-scroll-restore, realtime-sync, reader-prose-grammar, edge-swipe-nav and three block-editor files. None is reachable from a worktree, because the bytes they exercise are whatever production is serving. A worktree change cannot turn one red and cannot turn one green, so a green run is not evidence about the change and a red one is not a defect in it.

The failure count moved between two runs of one unchanged commit — 27, then 31 — which `domains/file-kinds/tests.md` calls broken.

The part worth a decision rather than a shrug: a test is not only a reader. These drive a real browser through a real session against the live site, so whatever they exercise, they exercise in production — and the run is reached by the ordinary `bun test` a seat runs to check its own package, with nothing at the command naming the target. The 20-minute duration is what makes a seat scope around it and never see what it pointed at.

Filed rather than fixed: it is not this project's, and it should not die with the run that noticed it.
