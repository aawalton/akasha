---
id: b0d570e9-5cbc-5f01-b1b8-cf47cedb0369
slug: ast-unused-cannot-see-whole-file-residue
page-type-slug: finding
title: "Ast unused cannot see whole file residue"
domain-slug: domain/global
---

# Claim

`check-ast-unused` can never report that a whole file is residue, because the entry set roots every file it would have to judge.

# Evidence

Established by #19102's seat on 2026-08-14 and visible in the check's own output. `ast-unused.config.json` gives `packages/agents/cli` an entry set of `src/**/*.ts` and `**/*.test.ts`. Every file in that workspace is therefore a reachability ROOT, so the check can only ever report an unused EXPORT inside a file, never that the file is reached by nothing.

The check says as much when it passes: "a module reached from there is credited WHOLE, so an unused export inside one is not reported."

WHAT IT COST. The halt-census command had been fully ported to the instructions repository, leaving sixteen files code-side. The check reported ONE violation, and only because that file's default export happened to be the single thing nobody imported. A dead command-line entry sat behind a green check until that one accident surfaced it, and the surrounding cluster was invisible throughout.

The row that owned the removal was written against sixteen — a count taken by NAME. Measured by reachability the port had left one reportable module, and eight of the sixteen turned out to be live, shared with the interactive census and the Stop-hook verdict path. Neither the name nor the check could separate residue from live code: the name because it describes what a module was written for rather than who reaches it, the check because its roots include the files in question.

STILL TRUE. #19102 did not touch the entry set and nothing since has. The same class of residue in any workspace configured this way is invisible to this instrument today.
