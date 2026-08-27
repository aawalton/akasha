---
id: b721da14-22d7-59c2-b059-c8606f056430
page-type-slug: finding
title: "Classifier comment names undetected library"
domain-slug: repo/code-repo
---

# Claim

The order rationale in `test-classification.ts` says the `component` rule fires on jsdom imports. No rule in the file carries a jsdom token, and `jsdom` appears nowhere else in the check package. The comment is the only place saying what the rule is for, so it is what a reader consults before adding a token, and it names as covered a library nothing detects.

# Evidence

Read against `~/code` at `383bf60d35`.

`packages/infra/checks/src/lib/test-classification.ts:89` gives the order rationale as "`component` next: jsdom + React Testing Library imports."

The `component` rule twenty lines below, at line 142, carries four tokens: `@testing-library/react`, `happy-dom`, `renderHook(` and `@shared/utils-test`. A grep for `jsdom` across `packages/infra/checks/src/` returns line 89 and nothing else, so no rule in the file detects it.

A test importing jsdom and nothing else therefore holds no token in any rule and falls through to `unit`, which is the lane that runs in the merge gate.

Whether the escape is being taken was unmeasured where this was first recorded, so it is measured here. Seven files in the repo import from `jsdom`: `packages/collections/books/src/parsers/utilities.ts`, `packages/collections/great-courses/src/great-courses-client.ts`, `packages/collections/wandering-inn/src/wandering-inn-client.ts`, three parsers under `packages/collections/royal-road/src/parsers/`, and `packages/shared/utils/sync/src/jsdom-utils.ts`. None is a test file.

Six test files mention the word. Every mention is a user-agent fixture string or a comment — `is-webkit.unit.test.ts:36` holds `jsdom/24.0.0` inside a UA string, and `tap-trace.unit.test.ts:13` and `page-card-perf.unit.test.ts:15` each open a comment with "Bun's default test runtime has no jsdom". Not one is an import.

So the escape is expressible and nothing is currently taking it. What is defective now is the comment: it is the only sentence in the file saying what the `component` rule is for, and a reader deciding whether to add a token is told a library is covered when nothing detects it.

Which half moves is not settled here. Adding a jsdom token closes the escape and widens the cohort the check refuses; correcting the comment leaves the escape standing and stops advertising it as shut.

Found ingesting `dirty/questions/code-repo-check-self-description.md`, now removed.
