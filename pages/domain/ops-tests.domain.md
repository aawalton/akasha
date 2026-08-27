---
id: 0722be2e-7d6c-54fd-95cb-f1e7e888600d
page-type-slug: domain
title: "Ops tests"
slug: ops-tests
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/test
---

# Definition

- **Ops tests** — the commands that run the suites a caller names and read what a run proved from its output.

# Design

A verdict is read from a run's own output beside its exit code, so a green suite that exited non-zero passes and a run that printed no summary certifies nothing.

Nothing here picks which suites to run; a caller names them.
