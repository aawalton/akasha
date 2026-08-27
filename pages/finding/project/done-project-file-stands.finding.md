---
id: f38eb036-035a-5564-9133-6a3dd657b681
page-type-slug: finding
title: "Done project file stands"
domain-slug: barred-meaning/project
---

# Claim

A project's file stands after the project reaches `done`, and nothing at the close removes it.

# Evidence

`page-types/project.md` states in Design that a project's file is deleted once it is done, and that a project ending at any other status keeps its file.

`ops project move-to <seq> --status done` writes the status to the document and then to the row, and leaves the document standing. Closing #19220 through it left `projects/19220.md` on disk reading `status: done`; removing it took a separate `ops memory rm`.

Three other project documents in the memory repository read `status: done` at the time of writing, each closed by a different seat. Whether a reaper is meant to take them on a later pass, or whether the close is where the removal belongs, is settled by nothing either verb says.
