---
id: 55303bda-4ba6-52a0-9dbf-b177e5957fbc
page-type-slug: old-ops-command
title: "Ops audit eso-typings-fresh"
slug: ops-audit-eso-typings-fresh
domain-parent-slug: domain/ops-audit
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/audit/eso-typings-fresh.ts
path: audit eso-typings-fresh
---

# Definition

- **Ops audit eso-typings-fresh** — every committed ESO artifact stamped behind the clone it came from.

# Design

It reads two trees: the artifacts in akasha, and the `~/esoui` clone their version is compared against.

An artifact carrying no version stamp is set aside, there being nothing on it to compare.

It refuses where the clone is absent, a comparison that never ran being a different answer from one that found no drift.

# Help

The ESO typings freshness reading, which needs two trees at once: the committed artifacts in akasha, and the `~/esoui` clone they were generated from. Every artifact carries a `Generated from the ~/esoui clone by` provenance line naming the `ops` command that rebuilds it, and an `ESO-API-Version` stamp; the clone carries its own version in the `h1. ESO UI Documentation for API Version <n>` header of `ESOUIDocumentation.txt`. Where the two disagree the committed artifact describes an API the game has moved past, and the fix is to run the command its provenance line names. This was the drift arm of `check-eso-typings-fresh` and could not stay a check: the clone sits outside the repository the check ran in, so an identical tree got exit 0 or exit 1 depending on a file under `$HOME` that no diff of the change under test would show. Worse, CI never had the clone at all — pods run with `HOME=/tmp` and no step acquires it — so the arm degraded to a weaker committed-only comparison on every CI run and still printed green. What stayed behind as a check is the arm a change under test can answer: that every clone-derived artifact carries an `ESO-API-Version` stamp, and that the stamps agree with each other. As an audit this reports and never refuses on a finding, and a finding still exits 0. It refuses only where the comparison could not be made at all, which is the condition the check had to swallow and this one may state. Artifacts carrying no stamp are set aside and named apart, there being nothing on them to compare; the check is what reports those. The denominator is artifacts COMPARED, which is the population found less those set aside (--repo-root, --eso-doc, --json)
