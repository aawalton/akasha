---
id: 142116ae-3011-5789-b677-fc563df37c5d
page-type-slug: finding
title: "Write flags unnamed key space"
domain-slug: domain/ops-cli
---

# Claim

Four write flags describe the keys they take as `{ key: value }` without naming the key space those
keys are read in, where five other flags of the same kind say `{ propertySlug: value }` — slug keys,
stored verbatim. They are `--properties-file` on `ops page-type create`, `ops page-type update`,
`ops property-definition create` and `ops property-definition update`.

Vagueness rather than a defect: a reader falls back on the example, and every one of those uses slug
keys.

# Evidence

Nine flags across the surface take attribute keys a caller supplies — eight `--properties-file` and
one `--set-file` on `ops page upsert`. Five name the key space in the flag's own description and four
do not.

`tools/checks/help-key-space.ts` guards the half that can do harm: no such flag may spell its key
space as a property definition's id. It reads 9 and finds 0, and it fails when pointed at the
opposite spelling, so it is looking.

The other half was deliberately left out of that check. It replaces
`packages/shared/pages/cli/src/help-key-space.unit.test.ts`, which asserted both that no
properties-bearing help matched `/propertyId/` and that each contained the word `slug`. The second is
an assertion about wording rather than about content, and over 765 hand-written helps it would fire on
style and be repaired back to green having checked nothing — which is what `Properties` on
`domains/file-kinds/tests.md` names.

The wording repair is worth making on its own commit. It was kept out of project #19011 because that
tree's third objective is that every verb answers exactly as it does today, and a help render is an
answer. Four renders would have moved for a readability gain.

