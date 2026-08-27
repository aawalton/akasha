---
id: 46d7a986-da6c-5897-8774-76a804351128
page-type-slug: finding
title: "Check footer connector assumes a pointer"
domain-slug: domain/code-quality
---

# Claim

Both check-footer composition sites render `→ see ${doc}`, a connector chosen when every payload was a document path. #17478 replaced those payloads with acts, so a failing check now renders `3 violation(s) found → see instead: a plain function`.

# Evidence

Read from source at the deployed SHA `baca4e3c`, 2026-08-02.

The two sites are `violation-reporter.ts:160` — `` `${tag}${count} violation(s) found → see ${doc}` `` — and `syntax-scanner-entry.ts:32` — `` `${counts} → see ${args.remediationDoc}` ``. Neither was touched by #17478.

What changed is what reaches them. `remediationHint(text)` returns its text as a `RemediationDoc`, and the nine production hints are acts rather than paths: `instead: a plain function`, `instead: a string-literal union`, `instead: a parse or a type predicate`, `instead: a property signature — "name: (args) => R"`, `route: the write through @agents/shared/db-messages`, `import: the tag from @agents/shared/wake-source-tags`, `resync: bun …--write`, `regenerate: bun …--write`, `fix: delete the file, or add a use site that references it`.

Each obeys its own spec exactly — one line, naming an act, no rationale. Each already carries its own verb, which is what makes `see` both ungrammatical and redundant in front of it. The defect is in the connector, and it was correct until the payload's kind changed underneath it.

Nothing observed it because no check carrying a hint fails on a clean tree. #17478's criterion 7 ran `check-no-readme`, `check-no-class` and `check-yaml-usage` and asked for a footer with no `→ see`; all three exit 0, so all three took their success branch, where the pointer is not composed at all. Two of those checks do carry hints. The criterion passed on evidence that could not have failed, and reads afterwards exactly like one that exercised the case.

The same gap is why this is worth writing down rather than assuming a reader will meet it: the string appears only when a check is already failing, which is when nobody is reading carefully.
