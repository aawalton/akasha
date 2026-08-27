---
page-type-slug: workstation-service
id: 2986fb56-638c-5275-bcb7-38f904099921
title: "Repos empty dir purge"
slug: repos-empty-dir-purge
domain-parent-slug: page-type/workstation-service
runs:
  - bash services/repos-empty-dir-purge.sh
enabled: true
schedule: "daily"
jitter-seconds: 1800
catch-up: true
---

# Definition

- **Repos empty dir purge** — the service that removes every directory holding nothing under Alan's repositories.

# Design

The purge leaves `.git` and `node_modules` to git and to the package installer.
