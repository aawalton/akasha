---
id: de2c4822-4f13-5939-8d8c-0abdb3f11bb1
page-type-slug: old-ops-command
title: "Ops finding rehome"
slug: ops-finding-rehome
domain-parent-slug: domain/ops-finding
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/finding/rehome.ts
path: finding rehome
irreversible: false
---

# Definition

- **Ops finding rehome** — one finding moved to another domain, key and folder together.

# Help

Rewrites the finding's `domain-slug:` key AND carries the file into the folder that slug names,
in ONE commit, repointing everything that cited the old path. The domain is stated once, so the
key and the folder cannot come apart — which is the state `tools/audits/findings-sorted.ts`
exists to report and which no command could prevent before.

CITATIONS ARE FOLLOWED. Findings cite each other in prose and one is cited from TSDoc, so a
hand-rolled `mv` strands them. The survey is `move/move.ts`'s, the same one `ops mv` runs, and
every rewrite it makes is printed
before anything lands. `ops mv` would move the file and repoint those citations too, but it
would leave the key behind, which is the disagreement this exists to make impossible.

WHERE THE FOLDER IS ALREADY RIGHT and only the key disagrees, nothing moves: the key is spliced
where it stands and landed alone. Both directions of the disagreement are this command's.

NO FLAG NAMES THE REPOSITORY. `pages/page-type/finding.page-type.md` declares which repository holds a
finding, that declaration is read here, and a path landing in any other repository is refused
naming the one it landed in. A relative path is taken against the directory this ran in. The
DOMAIN is validated against akasha, which is where a domain stands.
