---
id: 8e757e0f-f14e-51e8-aa1b-5b7303aaf1b4
page-type-slug: finding
title: "Owned domain ban collides with the governing set"
domain-slug: task/create-persona-voice
---

# Claim

Stage 1 of the voice task tells a seat to read neither her `championed-domain` document nor her `role` document, and for four of the forty that document is one the next bullet requires and the write gate refuses without.

# Evidence

MEASURED 2026-08-07 while reviewing `domains/tasks/persona-craft/create-persona-voice.md` line by line.

The line, at file 16: "**Read** her file whole, and neither her `championed-domain` document nor her `role` document. Both carry responsibilities … so reading them costs two documents and puts role prose in front of you moments before you write a voice."

The bullet under it has the seat read her file through `ops instructions read`, which hands over every document governing it, and `tools/gates/read-what-governs.ts` refuses a write without them.

I read `championed-domain:` off all 40 authored persona files and set it against what `ops instructions governs --file-path domains/personas/<name>.md` prints. Four personas own a domain that governs persona files: `aine` owns `global`, `athena` owns `agent-harness`, `sophia` owns `persona`, `ryn` owns `domain`. For those four the forbidden document is compulsory, and the line's own warrant fails as well — it costs nothing, arriving with her file either way. The other thirty-six own domains like `anime`, `food` or `chess`, which govern nothing here, and there the line is right.

The role half is sound throughout: no `domains/roles/*.md` document is in the governing set for a persona file.

WHAT MAKES IT WORSE THAN A DEAD CLAUSE. A seat writing one of those four is the seat most likely to obey, having just been told the cost. It then drafts, reaches the write, and is refused by a document the task named nowhere — which is the exact failure the bullet below this one exists to prevent.

NOT REPAIRED. Qualifying the prohibition, or dropping it, is authoring rather than reading, and the reviewing seat's Add rule sends anything resting on judgment back.
