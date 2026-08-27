---
id: 47ea38b9-b9ec-5756-99b3-ebd3fcd1a3f4
slug: notes-cite-the-removed-motivation-section
page-type-slug: finding
title: "Notes cite the removed motivation section"
domain-slug: barred-meaning/project
---

# Claim

Project documents carry Notes prose naming a `# Motivation` section that no longer exists.

# Evidence

The section was dropped from the project schema at `c7cd48e` and stripped from every project document in the memory repo. Some of those documents carry sentences in `# Notes` written against it — corrections, and judgments resting on it. `grep -ril motivation projects/*.md` names the set at any time, and is what to run rather than trusting the list below: it fell by two within the hour of filing, as seats rewrote their own Notes.

Three shapes stand in the set. A correction of the deleted prose, whose subject is now gone: `17790.md` opens a paragraph "A FIGURE IN THE MOTIVATION ABOVE IS WRONG AND IS THE LEAD'S", and `17812.md` "THE GROUNDING CORRECTION IS RIGHT AND THE MOTIVATION ABOVE IS WRONG WHERE IT SAYS OTHERWISE". A justification for work done, which still carries weight: `17864.md` gives "the Motivation names that exact text as the defect" as why an unasked-for change was right. And a plain citation: `17813.md` names "the consumer this row's Motivation named as load-bearing".

The first shape is spent and reads as a live warning about text a reader cannot find. The second and third lose their anchor but keep their claim. Which of the three a given sentence is cannot be settled by matching on the word, so this is per-document judgment rather than a sweep.

One repair of this kind is already landed, as the shape of the rest: `18163.md` carried the sub-heading `## Motivation paragraph two is superseded`, reworded to `## The original diagnosis is superseded` in the same act that removed the section.

As found on 2026-08-09: 17790, 17809, 17812, 17813, 17814, 17815, 17846, 17864, 17866, 17870, 17880, 17910, 17912, 17981, 17986, 17988, 17997, 18032, 18043, 18049, 18074, 18082, 18131, 18151, 18226, 18228, 18230.
