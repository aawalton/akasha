---
id: e005ea00-fb16-5125-8bd2-75f69eb14c01
page-type-slug: domain
title: "File naming tests"
slug: file-naming-tests
domain-parent-slug: domain/file-naming
required-reading-slugs:
  - domain/test-on-checks
  - domain/test-on-demand
  - domain/file-stem
  - domain/file-suffix
settled: true
---

# Definition

- **File naming tests** — how a test file's name is chosen.

# Intent

Every test file carries a file suffix naming it a test.

Every test file that tests a single file takes its file stem from that file.

A file suffix between the stem and the one naming it a test appears only where one file needs several test files and cannot be split.
