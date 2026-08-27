---
id: d123d66a-a956-5de0-a8d1-0748e59dcacd
page-type-slug: ops-command
title: "Ops check-ti-clean-source-zero"
slug: ops-check-ti-clean-source-zero
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/cluster-check
  - page-type/ops-command
command-path: tools/commands/check-ti-clean-source-zero.ts
path: check-ti-clean-source-zero
---

# Definition

- **Ops check-ti-clean-source-zero** — ruling that the ti-clean marks and the addon sources agree, both ways.

# Design

The territory map this rules against stands in this repository; the addon sources it scans stand in the code checkout named.

An addon whose source directory holds nothing scannable withholds the verdict rather than passing.

An addon marked both clean and blocked is a contradiction the map cannot hold, and stops the run.

# Help

Read every addon the territory map names, scan its TypeScript source for raw `table.insert` and
`table.remove` call sites, and rule that the map's ti-clean marks match what the source says.

The ratchet runs both ways. An addon marked ti-clean with a call site left has drifted back, and an
addon with no call site left and no mark is one the ratchet is not yet holding — both are findings,
because the mark is what stops a cleaned addon sliding back.

An exemption is a mark of its own. An addon carrying one whose last unconvertible call site has gone
is reported, so the exemption goes with the site it was written for rather than outliving it.
