---
page-type-slug: cluster-check
id: c9ef246e-889c-5f83-b3b4-9ebfe7989c6e
title: "App intent brand words check"
runner-name: app-intent-brand-words
script: akasha:infra/cluster-checks/src/checks/check-app-intent-brand-words.ts
dispatch-node-types:
  - kind: sh-file
slug: cluster-check-app-intent-brand-words
domain-parent-slug: page-type/cluster-check
---

# Definition

- **App intent brand words check** — No App Intent title, description, spoken phrase or short title carries the word "apple".
