---
id: fc9a03d3-5364-57a8-aae7-2986a732c67a
page-type-slug: finding
title: "The Definition carries a departure because the document has no Design section to hold it"
domain-slug: domain/global
---

# Claim

The Definition on `domains/commands/ops-seat-owed.md` carries a departure of the kind `domains/domain-design.md` names — "read off the project it states rather than off prose" — because the document has no Design section to hold it. The clause cannot be trimmed where it stands: "read off the project it states" names no departure without "rather than off prose", and no other document in the corpus carries the claim.

# Evidence

Read off the `review-instructions` reading of `domains/commands/ops-seat-owed.md` finished 2026-08-21, read end to end, three lines. That reading ran `ops seat owed` and `ops seat owed --json` here, and traced the clause through `projectOf`, `properties/seat-project-seq.md`, `readProjectDocumentStatus` and `parseFrontmatter`, finding no match against prose anywhere on the path. `grep -rn "owed" domains/ page-types/ properties/` finds the claim in no other document.

It kept the clause and did not move it: moving it means adding a Design section, which is growth on a reading's judgment rather than on an instrument.

Not measured here: I did not run the command or open the code path, and I did not count how many other command documents carry a departure in their Definition for want of a Design section.
