---
id: 051fdf96-ae4c-5e98-a537-c73ac2230dad
page-type-slug: old-ops-command
title: "Ops audit rule-population"
slug: ops-audit-rule-population
domain-parent-slug: domain/ops-audit
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/audit/rule-population.ts
path: audit rule-population
---

# Definition

- **Ops audit rule-population** — every enforcement rule that weighed nothing across the whole repo.

# Help

Every enforcement rule that weighed nothing across the whole repo — the case where a rule has stopped looking and its silence still reads as a rule that looked and was satisfied. A rule's population is what it WEIGHED, never what it FOUND, and the two coincide at zero, which is why a retired construct and a clean tree print the same green. Reports and never refuses: an empty population may want the rule removed or may want it repaired, and only a reading tells which, so the call stays a person's. Reaches the syntax scanners, whose populations come from the dispatch loop itself; the ast-grep rules are already refused on this by `check-ast-grep`, and the rules inside a check step have no registry to walk. Both exclusions print on every run. Two controls ride the real dispatch and exit 3 rather than clean: one rule that skips every file and must weigh none, one that skips nothing and must weigh all (--repo-root, --tree-sha, --cache-dir, --json)
