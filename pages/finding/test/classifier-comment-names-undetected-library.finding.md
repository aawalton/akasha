---
id: b721da14-22d7-59c2-b059-c8606f056430
page-type-slug: finding
title: "Classifier comment names undetected library"
domain-slug: domain/test
---

# Claim

A test whose only DOM dependency is jsdom matches no rule in the test classifier and falls through to `unit`. Nothing in the classifier records that the gap is there.

# Evidence

`infra/cluster-checks/src/lib/test-classification.ts:113`-`:117` holds the `component` rule, of kind `capability`, carrying exactly four tokens:

    tokens: ["@testing-library/react", "happy-dom", "renderHook(", "@shared/utils-test"],

There is no jsdom token, in that rule or in any other. `jsdom` matches nowhere at all under `infra/cluster-checks/src/`.

A file matching no rule is not refused; it is classified. `detectRequiredType` ends at `:182`:

    return { type: "unit", basis: "fallthrough", evidence: [], conflict: [] }

So a test importing jsdom and holding no other rule's token is classified `unit` on basis `fallthrough`.

The escape is expressible and nothing is currently taking it. Outside `node_modules` the tree holds one jsdom import, `tools/lib/great-courses/catalogue.ts:1`, which is not a test. One test file mentions the word: `shared/pages-ui/src/media/is-webkit.unit.test.ts:31`, where `jsdom/24.0.0` sits inside a user-agent fixture string rather than an import.

Which half moves is not settled here. Adding a jsdom token shuts the escape and widens the cohort the check refuses; leaving it open and recording it keeps the cohort where it is.

Unmeasured. What `unit` costs relative to the other lanes — which lane runs where, and whether `unit` is the cheaper or the stricter place to land — is not traced here; I read the classifier and not its consumers. Nothing was run: the fall-through is read off the source.
