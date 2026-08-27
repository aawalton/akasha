---
id: 664ed3da-d34c-50c2-9653-df030f27cfc3
slug: mv-cannot-see-a-computed-directory
page-type-slug: finding
title: "Mv cannot see a computed directory"
domain-slug: domain/global
---

# Claim

`mv.ts` cannot see a path whose directory segment is a variable, so a tree-wide move leaves such a reader broken with nothing reporting it until the code runs.

# Evidence

Moving all 243 property definitions from `properties/<type>/<key>.md` to `properties/<type>-<key>.md` left two functions in `tools/lib/rules-engine-corpus.ts` reading a directory that no longer existed. Both built the path as `` `${PROPERTY_ROOT}/${appliesTo}` `` and called `readdirSync` on it.

The move's own report was clean: `links` passed over 2853 documents with 0 breaks, `mentions` passed over 5532 files with 0 stranded, and `typecheck` passed. The help says a `${…}` before a path does not hide it, "what follows the `/` is the path written out whole" — but here the variable is what follows the `/`, and there is nothing literal left to match.

The cost was not the two functions. `category-rule-set.ts:54` calls that corpus at module load, and the gate runner imports it, so every gated write into the instructions repo crashed with ENOENT rather than refusing. `edit.ts`, `write.ts` and `mv.ts` were all unusable for every agent until the file was repaired.

The repair could not go through the gated verbs, because the verbs were the thing that was down. It went in as a direct write, then through `write.ts` once the gates ran again.

`git grep` for the literal prefix finds these: `grep -rn 'PROPERTY_ROOT\|"properties' tools/` named both sites in one line. Nothing ran that search, because the move reported clean.
